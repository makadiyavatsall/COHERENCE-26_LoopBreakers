def patient_to_text(patient):

    conditions = ", ".join(patient.get("conditions", []))
    medications = ", ".join(patient.get("medications", []))

    labs = patient.get("lab_results", {})

    hba1c = labs.get("hba1c", "unknown")
    sys_bp = labs.get("blood_pressure_systolic", "unknown")
    dia_bp = labs.get("blood_pressure_diastolic", "unknown")

    text = f"""
    Patient age {patient['age']} {patient['gender']}.
    Conditions: {conditions}.
    BMI {patient['bmi']}.
    HbA1c {hba1c}.
    Blood pressure {sys_bp}/{dia_bp}.
    Medications: {medications}.
    """

    return text