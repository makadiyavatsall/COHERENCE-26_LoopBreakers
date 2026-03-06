import json
import faiss

from fastapi import APIRouter
from utils.embedding_model import get_embeddings

router = APIRouter()

index = faiss.read_index("vector_store/patient_index.faiss")

with open("vector_store/patient_ids.json") as f:
    patient_ids = json.load(f)


@router.get("/search")
def search_trial():

    trial_text = """
    Patients with type 2 diabetes age between 40 and 75.
    HbA1c above 7.
    """

    embedding = get_embeddings([trial_text])

    k = 5

    distances, indices = index.search(embedding, k)

    results = [patient_ids[i] for i in indices[0]]

    return {"matches": results}