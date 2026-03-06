import json
import faiss
import numpy as np
import sys
import os

# Add project root to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.embedding_model import get_embeddings
from utils.text_converter import patient_to_text


# Load patients dataset
with open("data/patients.json", "r", encoding="utf-8") as f:
    patients = json.load(f)


# Load FAISS trial vector index
index = faiss.read_index("vector_store/trial_index.faiss")


# Load trial IDs
with open("vector_store/trial_ids.json", "r", encoding="utf-8") as f:
    trial_ids = json.load(f)


def retrieve_trials(patient, top_k=5):

    # Convert patient profile to text
    patient_text = patient_to_text(patient)

    # Generate embedding
    embedding = get_embeddings([patient_text])

    # Convert to numpy array
    embedding = np.array(embedding).astype("float32")

    # Search FAISS index
    distances, indices = index.search(embedding, top_k)

    results = []

    for i, idx in enumerate(indices[0]):

        distance = float(distances[0][i])

        # Convert FAISS L2 distance to similarity
        similarity = 1 / (1 + distance)

        results.append({
            "trial_id": trial_ids[idx],
            "distance": round(distance, 4),
            "similarity_score": round(similarity, 4)
        })

    return results


# -------------------------------
# Test retrieval for one patient
# -------------------------------

patient = patients[0]

matches = retrieve_trials(patient)

print("\nPatient:", patient["patient_id"])
print("\nTop Matching Trials:\n")

for m in matches:
    print(m)