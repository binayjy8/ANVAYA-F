import { useEffect, useState } from "react";
import API from "../services/api";

const defaulFom = {
    name: "",
    source: "website",
    salesAgent: "",
    status: "new",
    tags: "",
    timeToClose:"",
    priority: "medium",
};

function LeadForm() {
    const [formData, setFormData] = useState(defaulFom);
    const [agents, setAgents] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
}