import { useState } from "react";


export default function FiltersPanel({ onSearch, filters }) {

  const [localFilters, setLocalFilters] = useState(filters);

  const getNowDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getMinStartTime = () => {
    if (localFilters.date !== getNowDate()) return "";
    return new Date().toTimeString().slice(0, 5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localFilters); // 🔥 only search on submit
  };

  return (
    <div className="filters">
      <div className="content-header">
        <h4>Filters</h4>
      </div>

      <form className="filter-div" onSubmit={handleSubmit}>
        
        <label>Date</label>
        <input
          type="date"
          min={getNowDate()}
          value={localFilters.date}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, date: e.target.value })
          }
        />

        <label>From</label>
        <input
          type="time"
          min={getMinStartTime()}
          value={localFilters.from}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, from: e.target.value })
          }
        />

        <label>To</label>
        <input
          type="time"
          value={localFilters.to}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, to: e.target.value })
          }
        />

        {/* 🔥 NEW EXPERTISE DROPDOWN */}
        <label>Expertise</label>
        <select
          value={localFilters.expertise}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, expertise: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="Java">Java</option>
          <option value="React">React</option>
          <option value="Spring Boot">Spring Boot</option>
          <option value="Node">Node</option>
        </select>

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}