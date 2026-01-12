import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Table, { type TableColumn } from "../components/Table";

type Person = {
  id: number;
  name: string;
  age: number;
  city: string;
};

const meta: Meta<typeof Table<Person>> = {
  title: "Example/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table<Person>>;

const sampleData: Person[] = [
  { id: 1, name: "Alice", age: 30, city: "New York" },
  { id: 2, name: "Bob", age: 24, city: "London" },
  { id: 3, name: "Charlie", age: 35, city: "Paris" },
  { id: 4, name: "David", age: 29, city: "New York" },
  { id: 5, name: "Eve", age: 22, city: "London" },
];

const sampleDataBig: Person[] = [
  { id: 1, name: "Alice", age: 30, city: "New York" },
  { id: 2, name: "Bob", age: 24, city: "London" },
  { id: 3, name: "Charlie", age: 35, city: "Paris" },
  { id: 4, name: "David", age: 29, city: "New York" },
  { id: 5, name: "Eve", age: 22, city: "London" },
  { id: 6, name: "Frank", age: 30, city: "New York" },
  { id: 7, name: "George", age: 24, city: "London" },
  { id: 8, name: "Hannah", age: 35, city: "Paris" },
  { id: 9, name: "Isaac", age: 29, city: "New York" },
  { id: 10, name: "James", age: 22, city: "London" },
  { id: 11, name: "Katie", age: 30, city: "New York" },
  { id: 12, name: "Liam", age: 24, city: "London" },
  { id: 13, name: "Mia", age: 35, city: "Paris" },
  { id: 14, name: "Noah", age: 29, city: "New York" },
  { id: 15, name: "Olivia", age: 22, city: "London" },
  { id: 16, name: "Patrick", age: 30, city: "New York" },
  { id: 17, name: "Quinn", age: 24, city: "London" },
  { id: 18, name: "Ryan", age: 35, city: "Paris" },
  { id: 19, name: "Sarah", age: 29, city: "New York" },
  { id: 20, name: "Thomas", age: 22, city: "London" },
  { id: 21, name: "Uma", age: 30, city: "New York" },
  { id: 22, name: "Victor", age: 24, city: "London" },
  { id: 23, name: "William", age: 35, city: "Paris" },
  { id: 24, name: "Xavier", age: 29, city: "New York" },
  { id: 25, name: "Yvonne", age: 22, city: "London" },
  { id: 26, name: "Zachary", age: 30, city: "New York" },
];

const columns: TableColumn<Person>[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    accessor: (p) => p.id,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
    accessor: (p) => p.name,
  },
  {
    key: "age",
    label: "Age",
    sortable: true,
    accessor: (p) => p.age,
  },
  {
    key: "city",
    label: "City",
    sortable: true,
    accessor: (p) => p.city,
  },
];

export const Default: Story = {
  args: {
    columns: columns,
    data: sampleData,
  },
};

export const NoSorting: Story = {
  args: {
    columns: columns.map((col) => ({ ...col, sortable: false })),
    data: sampleData,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: sampleDataBig,

    loading: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 15],
  },
};

export const CustomRender: Story = {
  args: {
    columns: [
      {
        key: "name",
        label: "Full Name",
        sortable: true,
        accessor: (p) => p.name,
        render: (p) => <strong>{p.name}</strong>,
      },
      {
        key: "age",
        label: "Age in Years",
        sortable: true,
        accessor: (p) => p.age,
        render: (p) => <em>{p.age} years old</em>,
      },
      {
        key: "city",
        label: "Location",
        sortable: true,
        accessor: (p) => p.city,
      },
    ],
    data: sampleData,
  },
};

export const SingleSelect: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<number | undefined>();

    return (
      <Table
        {...args}
        selectionType="single"
        selectedRowId={selectedId}
        onSelect={(row) => setSelectedId(row.id)}
        onRowClick={(row) => setSelectedId(row.id)}
      />
    );
  },
  args: {
    columns,
    data: sampleData,

    getRowId: (row) => row.id,
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<Person[]>([]);

    return (
      <Table
        {...args}
        selectionType="multiple"
        selectedRowIds={selectedRows.map((row) => row.id)}
        onSelectMany={setSelectedRows}
      />
    );
  },
  args: {
    columns,
    data: sampleData,

    getRowId: (row) => row.id,
  },
};

export const RowClick: Story = {
  render: (args) => {
    const [clickedName, setClickedName] = useState<string | undefined>();

    return (
      <>
        <Table {...args} onRowClick={(row) => setClickedName(row.name)} />
        <p style={{ marginTop: 12 }}>
          Sist klikket rad: <strong>{clickedName ?? "Ingen"}</strong>
        </p>
      </>
    );
  },
  args: {
    columns,
    data: sampleData,
  },
};

export const Paginated: Story = {
  args: {
    columns,
    data: sampleDataBig,
    pageSize: 10,
  },
};

export const PaginatedWithPageSizeSelector: Story = {
  render: (args) => {
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    return (
      <Table
        {...args}
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    );
  },
  args: {
    columns,
    data: sampleDataBig,
    pageSizeOptions: [5, 10, 15, 25],
    pageSize: 5,
  },
};
