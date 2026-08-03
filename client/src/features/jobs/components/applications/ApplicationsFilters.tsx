import { Input, Select } from "antd";
import { STATUS_OPTIONS } from "../../../../constants/status";

const { Search } = Input;

interface Props {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ApplicationsFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className='flex flex-wrap gap-3 mb-4'>
      <Search
        placeholder='Search by company, role or location...'
        allowClear
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ maxWidth: 340 }}
        size='large'
      />
      <Select
        value={statusFilter}
        onChange={onStatusChange}
        size='large'
        style={{ width: 160 }}
        options={[{ label: "All status", value: "all" }, ...STATUS_OPTIONS]}
      />
    </div>
  );
}
