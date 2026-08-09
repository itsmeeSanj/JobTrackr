import { Button, Input, Select } from "antd";
import { STATUS_OPTIONS } from "../../../../constants/status";
import { FaPlus } from "react-icons/fa";

const { Search } = Input;

interface Props {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onclick: any;
}

export default function ApplicationsFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onclick,
}: Props) {
  return (
    <div className='flex flex-wrap justify-between gap-3 mb-4'>
      <div className='flex gap-x-2'>
        <Search
          placeholder='Search by company'
          allowClear
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ maxWidth: 250 }}
          size='medium'
        />

        <Select
          value={statusFilter}
          onChange={onStatusChange}
          size='medium'
          style={{ width: 120 }}
          options={[{ label: "All status", value: "all" }, ...STATUS_OPTIONS]}
        />
      </div>

      <Button
        type='primary'
        size='large'
        icon={<FaPlus size={15} />}
        onClick={() => onclick()}
      >
        Add
      </Button>
    </div>
  );
}
