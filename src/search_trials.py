import faiss
import json

from utils.embedding_model import get_embeddings

# Load vector index
index = faiss.read_index("vector_store/patient_index.faiss")

# Load patient IDs
with open("vector_store/patient_ids.json") as f:
    patient_ids = json.load(f)

# Example trial criteria
trial_text = """
Patients with type 2 diabetes age between 40 and 75.
HbA1c above 7.
"""

# Convert trial to embedding
query_embedding = get_embeddings([trial_text])

# Search
k = 5

distances, indices = index.search(query_embedding, k)

print("Top matching patients:")

for i in indices[0]:
    print(patient_ids[i])