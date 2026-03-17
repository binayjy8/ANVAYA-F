import { useEffect, useState } from "react";
import API from "../services/api";

function LeadDetails({ leadId }) {
  const [lead, setLead] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeadData() {
      try {
        const [leadResponse, commentsResponse] = await Promise.all([
          API.get(`/leads/${leadId}`),
          API.get(`/leads/${leadId}/comments`),
        ]);

        setLead(leadResponse.data);
        setComments(commentsResponse.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchLeadData();
  }, [leadId]);

  async function handleAddComment(event) {
    event.preventDefault();

    try {
      const response = await API.post(`/leads/${leadId}/comments`, {
        commentText,
      });

      setComments((prev) => [response.data, ...prev]);
      setCommentText("");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p>{error}</p>;
  if (!lead) return <p>Loading lead details...</p>;

  return (
    <div>
      <h2>{lead.name}</h2>
      <p>Status: {lead.status}</p>
      <p>Priority: {lead.priority}</p>
      <p>Source: {lead.source}</p>
      <p>Sales Agent: {lead.salesAgent?.name || "Unassigned"}</p>
      <p>Time to Close: {lead.timeToClose} days</p>
      <p>Tags: {lead.tags?.join(", ") || "None"}</p>

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <textarea
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Add an update"
          required
        />
        <button type="submit">Add Comment</button>
      </form>

      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.commentText}</p>
          <small>
            {comment.author?.name || "Unknown"} | {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default LeadDetails;
