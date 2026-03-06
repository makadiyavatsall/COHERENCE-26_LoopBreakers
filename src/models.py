from pydantic import BaseModel
from typing import List

class LabResults(BaseModel):
    hba1c: float
    blood_pressure_systolic: int
    blood_pressure_diastolic: int


class Patient(BaseModel):
    patient_id: str
    age: int
    gender: str
    conditions: List[str]
    medications: List[str]
    bmi: float
    lab_results: LabResults