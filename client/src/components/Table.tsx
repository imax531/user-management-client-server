import { BaseSyntheticEvent, useState } from "react";
import { SubmitableInput } from "./SubmitableInput";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";

interface Column<T> {
  title: string;
  key: string;
  dataIndex: string;
  editable?: boolean;
  defaultValue?: string;
  onEdit?: (data: T) => void;
}

interface TableProps<T> {
  columns: Array<Column<T>>;
  data: Array<T>;
  isLoading?: boolean;
  errorMessage?: string;
  onDelete?: (data: T) => void;
}

export function Table<T>(props: TableProps<T>) {
  const [editKey, setEditKey] = useState<string>();

  const rowConfig = [
    "bg-white border-b dark:bg-gray-900 dark:border-gray-700",
    "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700",
  ];

  function TableRow({ row, index }: { row: T; index: number }) {
    return (
      <tr className={rowConfig[index % rowConfig.length]} key={index}>
        {props.columns.map((col) => {
          const key = col.dataIndex + index;
          return (
            <td
              className="w-1/4 px-6 py-4"
              key={key}
              onClick={() => col.editable && setEditKey(key)}
            >
              {editKey === key ? (
                <SubmitableInput
                  className="w-1/2"
                  key={key}
                  onSubmit={(value) => {
                    col.onEdit && col.onEdit({ ...row, [col.key]: value });
                    setEditKey("");
                  }}
                  onCancel={() => setEditKey("")}
                />
              ) : (
                <div className={col.editable ? "cursor-pointer" : ""}>
                  <div className="inline-block">
                    {
                      // @ts-ignore
                      row[col.key] ?? col.defaultValue
                    }
                  </div>
                  {col.editable && (
                    <EditIcon className="w-3 ml-2 inline-block" />
                  )}
                </div>
              )}
            </td>
          );
        })}
        {props.onDelete && (
          <td
            className="cursor-pointer w-1/4 px-6 py-3"
            onClick={() => props.onDelete!(row)}
          >
            <DeleteIcon />
          </td>
        )}
      </tr>
    );
  }

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {props.columns.map((col) => (
            <th scope="col" className="w-1/4 px-6 py-3" key={col.dataIndex}>
              {col.title}
            </th>
          ))}
          {props.onDelete && <th className="w-1/4"></th>}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <TableRow key={index} row={row} index={index} />
        ))}
      </tbody>
    </table>
  );
}
