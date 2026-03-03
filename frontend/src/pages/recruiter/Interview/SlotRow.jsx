export default function SlotRow({ slot, onBook }) {
  // console.log(slot)
  return (
    <div className="slot-row">
      <span>
        {slot.startTime} – {slot.endTime}
      </span>
      <button
        className="book-btn"
        onClick={() => onBook(slot.slotId)}
        disabled={slot.slotStatus !== 'AVAILABLE'}
      >
        {slot.slotStatus == 'AVAILABLE'?'Book':'Booked'}
      </button>
    </div>
  );
}
