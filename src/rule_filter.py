def rule_filter(patient):

    if patient["age"] < 40:
        return False

    if "Type 2 diabetes" not in patient.get("conditions", []):
        return False

    return True