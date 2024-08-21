"use client";

import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Pagination, PaginationItem } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationContent, PaginationEllipsis, PaginationLink } from "../ui/pagination";

const DataTable = ({ columns, data = [], btnNew, isAdmin }) => {

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 })

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  const table = useReactTable({
    data,
    columns,
    filterFns:{
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: 'fuzzy',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination,
    }
  });

  useEffect(()=>{
    setPagination({ ...pagination, pageIndex: 0 })
  },[data])

  return (
    <>
      <div className="flex flex-grow flex-col w-full  ">
        <div className="w-full flex items-center py-3 justify-between gap-2">
          <Input
            placeholder="Buscar..."
            // value={(table.getColumn("email")?.getFilterValue()) ?? ""}
            // onChange={(event) =>
            //   table.getColumn("email")?.setFilterValue(event.target.value)
            // }
            onChange={(event) => setGlobalFilter(event.target.value)}
            value={globalFilter}
            className="max-w-sm m-2 w-full"
          />
          <div className="w-full flex justify-end  p-2">
            {btnNew && btnNew()}

          </div>
        </div>
        <div className="flex-grow rounded-md border max-w-full h-full overflow-x-auto">
          <Table className="table md:table-fixed min-w-full table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </div>
        <Pagination className="bottom-0 pt-2">
            <PaginationContent>
              <PaginationItem>
                <Button
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <BiFirstPage className="w-3 h-3"/>
                </Button>
              </PaginationItem>
              
              <PaginationItem>
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <GrFormPrevious className="w-3 h-3"/>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>
                {typeof table.getState().pagination.pageIndex !== 'number'? <PaginationEllipsis />: table.getState().pagination.pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <GrFormNext className="w-3 h-3"/>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <BiLastPage className="w-3 h-3"/>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>
    </>
  );
};
export default DataTable;
