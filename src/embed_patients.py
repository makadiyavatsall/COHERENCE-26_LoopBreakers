import sys
import os

# Add project root to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
import numpy as np
import faiss

from utils.text_converter import patient_to_text
from utils.embedding_model import get_embeddings

# Load patients
with open("data/patients.json") as f:
    patients = json.load(f)

# Convert patients to text
texts = [patient_to_text(p) for p in patients]

# Generate embeddings
embeddings = get_embeddings(texts)

# Create FAISS index
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(np.array(embeddings))

# Save vector index
faiss.write_index(index, "vector_store/patient_index.faiss")

# Save patient IDs
patient_ids = [p["patient_id"] for p in patients]

with open("vector_store/patient_ids.json", "w") as f:
    json.dump(patient_ids, f)

print("✅ Vector database created successfully")