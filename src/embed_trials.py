import sys
import os
import json
import numpy as np
import faiss

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.embedding_model import get_embeddings

# Load trials JSON
with open("data/trials.json", "r", encoding="utf-8") as f:
    trials = json.load(f)

trial_texts = []
trial_ids = []

for trial in trials:

    # Access nested protocol section
    protocol = trial.get("protocolSection", {})

    identification = protocol.get("identificationModule", {})
    description = protocol.get("descriptionModule", {})
    conditions_module = protocol.get("conditionsModule", {})
    eligibility_module = protocol.get("eligibilityModule", {})

    # Extract fields safely
    trial_id = identification.get("nctId", "")

    title = identification.get("briefTitle", "")

    official_title = identification.get("officialTitle", "")

    conditions = conditions_module.get("conditions", [])

    eligibility = eligibility_module.get("eligibilityCriteria", "")

    summary = description.get("briefSummary", "")

    # Convert condition list to text
    if isinstance(conditions, list):
        conditions_text = ", ".join(conditions)
    else:
        conditions_text = str(conditions)

    # Create embedding text
    text = f"""
    Clinical trial title: {title}.
    Official title: {official_title}.
    Conditions studied: {conditions_text}.
    Summary: {summary}.
    Eligibility criteria: {eligibility}.
    """

    trial_texts.append(text)

    trial_ids.append(trial_id)

# Generate embeddings
embeddings = get_embeddings(trial_texts)

# Create FAISS index
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(np.array(embeddings))

# Save FAISS index
faiss.write_index(index, "vector_store/trial_index.faiss")

# Save trial IDs
with open("vector_store/trial_ids.json", "w", encoding="utf-8") as f:
    json.dump(trial_ids, f, indent=2)

print("✅ Trial embeddings stored in FAISS successfully")