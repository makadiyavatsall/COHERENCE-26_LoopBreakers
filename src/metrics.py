def precision_at_k(retrieved, relevant, k):

    retrieved_k = retrieved[:k]

    relevant_set = set(relevant)

    hits = 0

    for r in retrieved_k:
        if r in relevant_set:
            hits += 1

    return hits / k


def recall_at_k(retrieved, relevant, k):

    retrieved_k = retrieved[:k]

    relevant_set = set(relevant)

    hits = 0

    for r in retrieved_k:
        if r in relevant_set:
            hits += 1

    if len(relevant_set) == 0:
        return 0

    return hits / len(relevant_set)


def mean_similarity(results):

    if len(results) == 0:
        return 0

    total = 0

    for r in results:
        total += r["similarity_score"]

    return total / len(results)