import React from "react";
import { router } from "next/client";
import { useTable } from "react-table";

import Button from "../Buttons/Button";

import { DataTable } from "../../Interfaces/Interfaces";

// interface TableRows {
//   id: string;
//   getRowProps: () => void;
//   original: {
//     repo: {
//       id: string;
//       name: string;
//       primaryLanguage: string;
//       updatedAt: string;
//       url: string;
//       stargazerCount: number;
//       viewerHasStarred: boolean;
//     };
//   };
// }

const Table = (props: DataTable) => {
  const columns: any = React.useMemo(() => [{ accessor: "repos" }], []);
  const data = props.data;
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleClickStar = (viewerHasStarred: boolean, id: string) => {
    let countStar = -1;
    if (!viewerHasStarred) {
      countStar += 2;
    }
    props.updateStar(viewerHasStarred, id, countStar);
  };

  const handleClickRepository = (name: string) => {
    router.push("/repositories/" + name);
  };

  return (
    <>
      <table {...getTableProps()} className={"w-full mt-4"}>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, index: number) => {
            prepareRow(row);
            return (
              <tr
                key={index + row.id}
                {...row.getRowProps()}
                className={
                  "w-full h-36 bg-customBlack text-white border-t border-b border-gray-600 flex items-center "
                }
              >
                <td
                  className={"flex justify-between items-center w-full h-full"}
                >
                  <div>
                    <a href={row.original.repo.url} className={"underline"}>
                      {row.original.repo.name}
                    </a>
                    <p className={"mt-4"}>
                      {row.original.repo.updatedAt.split("T")[0]}
                    </p>
                  </div>
                  <div className="my-4 flex flex-col justify-around items-center h-full">
                    <div className="flex justify-center items-center">
                      <div className="-mr-4 px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white">
                        <p>{row.original.repo.stargazerCount}</p>
                      </div>

                      <Button
                        action={() =>
                          handleClickStar(
                            row.original.repo.viewerHasStarred,
                            row.original.repo.id
                          )
                        }
                        title={
                          row.original.repo.viewerHasStarred ? "Unstar" : "Star"
                        }
                        class={"bg-customGray hover:bg-gray-600"}
                      />
                    </div>
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() =>
                        handleClickRepository(row.original.repo.name)
                      }
                    >
                      <p>Description...</p>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
