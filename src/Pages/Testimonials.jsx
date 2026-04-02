import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://yaticare-backend.onrender.com/api/user/testimonials",
      ); // Adjust the API endpoint as needed

      console.log(response.data);
      const data =
        response.data.data ||
        (Array.isArray(response.data)
          ? response.data
          : response.data.testimonials || []);
      setTestimonials(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch testimonials");
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setProcessingIds((prev) => new Set(prev).add(id));
    try {
      await axios.put(
        `https://yaticare-backend.onrender.com/api/admin/approve-testimonial/${id}`,
      );
      toast.success("Testimonial approved");
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      alert("Failed to approve testimonial");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDelete = async (id) => {
    setProcessingIds((prev) => new Set(prev).add(id));
    try {
      await axios.delete(
        `https://yaticare-backend.onrender.com/api/admin/delete-testimonial/${id}`,
      );
      toast.success("Testimonial deleted");
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      alert("Failed to delete testimonial");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleModalConfirm = async () => {
    setConfirmLoading(true);
    if (action === "approve") {
      await handleApprove(selectedId);
    } else if (action === "delete") {
      await handleDelete(selectedId);
    }
    setConfirmLoading(false);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Testimonial</th>
              <th className="py-2 px-4 border-b">Approved</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {testimonial.user?.userName || "Unknown"}
                </td>
                <td className="py-2 px-4 border-b">
                  {testimonial.testimonial}
                </td>
                <td className="py-2 px-4 border-b">
                  {testimonial.approved ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  {!testimonial.approved && (
                    <button
                      onClick={() => {
                        setAction("approve");
                        setSelectedId(testimonial._id);
                        setModalVisible(true);
                      }}
                      disabled={processingIds.has(testimonial._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setAction("delete");
                      setSelectedId(testimonial._id);
                      setModalVisible(true);
                    }}
                    disabled={processingIds.has(testimonial._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title={`Confirm ${action === "approve" ? "Approval" : "Deletion"}`}
        open={modalVisible}
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
        okText={action === "approve" ? "Approve" : "Delete"}
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        okButtonProps={{
          style: {
            backgroundColor: action === "approve" ? "#22c55e" : "#ef4444",
            borderColor: action === "approve" ? "#22c55e" : "#ef4444",
          },
        }}
      >
        <p>Are you sure you want to {action} this testimonial?</p>
      </Modal>
    </div>
  );
};

export default Testimonials;
