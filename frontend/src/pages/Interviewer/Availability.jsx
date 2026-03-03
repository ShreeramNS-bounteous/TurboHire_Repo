import { useEffect, useState } from "react";
import {
  getMyAvailabilitySlots,
  addAvailabilitySlot,
  deleteAvailabilitySlot,
} from "../../api/interviewer.api";
import { useAuth } from "../../auth/AuthContext";
import toast from "react-hot-toast";

export default function Availability() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  /* ==============================
     CHECK IF SLOT IS EXPIRED
  =============================== */
  const isSlotExpired = (slot) => {
    const now = new Date();
    const slotEnd = new Date(`${slot.slotDate}T${slot.endTime}`);
    return slotEnd < now;
  };

  /* ==============================
     LOAD SLOTS
  =============================== */
  const loadSlots = async () => {
    if (!userId) return;

    try {
      const data = await getMyAvailabilitySlots(userId);
      setSlots(data || []);
    } catch (err) {
      console.error("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, [userId]);

  /* ==============================
     HANDLE INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ==============================
     ADD SLOT (FULL VALIDATION)
  =============================== */
  const handleAddSlot = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not loaded yet. Please refresh.");
      return;
    }

    if (!form.date || !form.startTime || !form.endTime) {
      toast.error("All fields are required");
      return;
    }

    if (form.startTime >= form.endTime) {
      toast.error("End time must be after start time");
      return;
    }

    const now = new Date();
    const newStart = new Date(`${form.date}T${form.startTime}`);
    const newEnd = new Date(`${form.date}T${form.endTime}`);

    // ❌ Prevent past slot
    if (newStart < now) {
      toast.error("Cannot add slot in the past");
      return;
    }

    // ❌ Prevent duplicate slot
    const duplicate = slots.some(
      (slot) =>
        slot.slotDate === form.date &&
        slot.startTime === form.startTime &&
        slot.endTime === form.endTime
    );

    if (duplicate) {
      toast.error("This exact slot already exists");
      return;
    }

    // ❌ Prevent overlapping slot
    const overlapping = slots.some((slot) => {
      if (slot.slotDate !== form.date) return false;

      const existingStart = new Date(
        `${slot.slotDate}T${slot.startTime}`
      );
      const existingEnd = new Date(
        `${slot.slotDate}T${slot.endTime}`
      );

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (overlapping) {
      toast.error("This slot overlaps with an existing slot");
      return;
    }

    try {
      setSaving(true);

      await addAvailabilitySlot(userId, {
        slotDate: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
      });

      toast.success("Slot added successfully");

      setForm({ date: "", startTime: "", endTime: "" });
      loadSlots();
    } catch (err) {
      toast.error("Failed to add slot");
    } finally {
      setSaving(false);
    }
  };

  /* ==============================
     DELETE SLOT
  =============================== */
  const handleDelete = async (slotId, booked) => {
    if (booked) return;

    if (!window.confirm("Delete this slot?")) return;

    await deleteAvailabilitySlot(slotId, userId);
    toast.success("Slot deleted");
    loadSlots();
  };

  /* ==============================
     FILTER ACTIVE SLOTS ONLY
  =============================== */
  const activeSlots = slots.filter((slot) => !isSlotExpired(slot));

  const today = new Date().toISOString().split("T")[0];

  const getMinStartTime = () => {
    if (form.date !== today) return "";
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  return (
    <div className="md:px-12 py-10  min-h-screen font-['Montserrat']">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#101828]">
          My Availability
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage your available interview slots
        </p>
      </div>

      {/* ADD SLOT CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h2 className="text-lg font-bold text-[#101828] mb-6">
          Add New Slot
        </h2>

        <form onSubmit={handleAddSlot} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="date"
              name="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="time"
              name="startTime"
              min={getMinStartTime()}
              value={form.startTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={saving || !userId}
            className="bg-[#101828] hover:bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Slot"}
          </button>
        </form>
      </div>

      {/* SLOT LIST */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-lg font-bold text-[#101828] mb-6">
          Your Slots
        </h2>

        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading slots...
          </div>
        )}

        {!loading && activeSlots.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No active availability slots.
          </div>
        )}

        <div className="space-y-4">
          {activeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`flex justify-between items-center p-5 border border-gray-100 rounded-xl transition-all ${
                slot.booked ? "bg-gray-50" : "hover:shadow-md"
              }`}
            >
              <div>
                <p className="font-semibold text-[#101828]">
                  {slot.slotDate}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {slot.startTime} → {slot.endTime}
                </p>

                {slot.booked && (
                  <span className="text-xs text-blue-500 font-semibold mt-1 inline-block">
                    Booked
                  </span>
                )}
              </div>

              <button
                disabled={slot.booked}
                onClick={() =>
                  handleDelete(slot.id, slot.booked)
                }
                className={`font-semibold text-sm transition ${
                  slot.booked
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-red-500 hover:text-red-600"
                }`}
              >
                {!slot.booked ? "Delete" : "Booked"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
