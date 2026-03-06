import json
import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from retrieval.retrieve_trials import retrieve_trials
from evaluation.metrics import precision_at_k, recall_at_k, mean_similarity


# Load patients
with open("data/patients.json", "r", encoding="utf-8") as f:
    patients = json.load(f)

# Load ground truth
with open("evaluation/ground_truth.json", "r") as f:
    ground_truth = json.load(f)


k = 5

precision_scores = []
recall_scores = []
similarity_scores = []


for patient in patients:

    patient_id = patient["patient_id"]

    results = retrieve_trials(patient, top_k=k)

    retrieved_ids = []

    for r in results:
        retrieved_ids.append(r["trial_id"])

    relevant = ground_truth.get(patient_id, [])

    p = precision_at_k(retrieved_ids, relevant, k)

    r = recall_at_k(retrieved_ids, relevant, k)

    sim = mean_similarity(results)

    precision_scores.append(p)

    recall_scores.append(r)

    similarity_scores.append(sim)


# Compute averages
avg_precision = sum(precision_scores) / len(precision_scores)
avg_recall = sum(recall_scores) / len(recall_scores)
avg_similarity = sum(similarity_scores) / len(similarity_scores)


print("\nEvaluation Report\n")

print("Patients evaluated:", len(patients))

print("\nPrecision@5:", round(avg_precision, 3))

print("Recall@5:", round(avg_recall, 3))

print("Mean Similarity Score:", round(avg_similarity, 3))