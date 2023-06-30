'use client';

import { Table } from '@tanstack/react-table';
import {PlusCircle, X} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/data-table-view-options';

import { priorities, statuses } from '@/data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import * as React from "react";
import {Dialog, DialogTrigger} from "@radix-ui/react-dialog";
import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {Separator} from "@/components/ui/separator";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const [value, setValue] = useState({ en: '', ms: '', ar: ''})
	const [range, setRange] = useState({ start: '', end: '' })
	const [data, setData] = useState([])

	const isFiltered =
		table.getPreFilteredRowModel().rows.length >
		table.getFilteredRowModel().rows.length;

	const selected = table.getRowModel().rows.map((row) => {
		if (row.getIsSelected()) {
			// @ts-ignore
			return row.original.id
		}
		return null
	})

	async function add(index: any) {
		let copyData: any = [...data]
		copyData[index] = {
			value: {
				...value
			},
			range: {
				...range
			},
			valueId: uuidv4()
		}
		console.log(copyData)
		setData([...copyData] as any)
	}

	async function onDelete() {
		try {
			const response = await fetch('/delete', {
				method: 'POST',
				body: JSON.stringify(selected.filter(s => s !== null))
			});

			if (response.ok) {
				console.log('Delete successfully');
				// Handle success
			} else {
				console.error('Error uploading file');
				// Handle error
			}
		} catch (error) {
			console.error('Error uploading file:', error);
			// Handle error
		}
	}

	async function onUpdate() {
		const reqObj = {
			selected: selected.filter(s => s !== null),
			value,
			valueId: uuidv4(),
			range
		}

		try {
			const response = await fetch('/update', {
				method: 'POST',
				body: JSON.stringify(data)
			});

			if (response.ok) {
				console.log('Update successfully');
				// Handle success
			} else {
				console.error('Error uploading file');
				// Handle error
			}
		} catch (error) {
			console.error('Error uploading file:', error);
			// Handle error
		}
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter tasks..."
					value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('content')?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				<Button><PlusCircle className="mr-2 h-4 w-4" />Add chapter</Button>
				<Dialog>
					<DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add volume</Button></DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your account
								and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
						<p>1.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(0)}>Add</Button>
						<Separator className="my-4"/>
						<p>2.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(1)}>Add</Button>
						<Separator className="my-4"/>
						<p>3.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(2)}>Add</Button>
						<Separator className="my-4"/>
						<p>4.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(3)}>Add</Button>
						<Separator className="my-4"/>
						<p>5.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(4)}>Add</Button>
						<Separator className="my-4"/>
						<p>6.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(5)}>Add</Button>
						<Separator className="my-4"/>
						<p>7.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(6)}>Add</Button>
						<Separator className="my-4"/>
						<p>8.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(7)}>Add</Button>
						<Separator className="my-4"/>
						<p>9.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(8)}>Add</Button>
						<Separator className="my-4"/>
						<p>10.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(9)}>Add</Button>
						<Separator className="my-4"/>
						<p>11.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(10)}>Add</Button>
						<Separator className="my-4"/>
						<p>12.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(11)}>Add</Button>
						<Separator className="my-4"/>
						<p>13.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(12)}>Add</Button>
						<Separator className="my-4"/>
						<p>14.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(13)}>Add</Button>
						<Separator className="my-4"/>
						<p>15.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Separator className="my-4"/>
						<Button onClick={() => add(14)}>Add</Button>
						<p>16.</p>
						<Input placeholder="Malay" onChange={(e) => setValue({ ...value, ms: e.target.value })}/>
						<Input placeholder="Arabic" onChange={(e) => setValue({ ...value, ar: e.target.value })}/>
						<Input placeholder="start" onChange={(e) => setRange({ ...range, start: e.target.value })}/>
						<Input placeholder="end" onChange={(e) => setRange({ ...range, end: e.target.value })}/>
						<Button onClick={() => add(15)}>Add</Button>
						<Separator className="my-4"/>
						<Button onClick={() => onUpdate()}>Submit</Button>
					</DialogContent>
				</Dialog>
				<Button onClick={() => onDelete()}><PlusCircle className="mr-2 h-4 w-4" />Delete</Button>
				{table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title="Status"
						options={statuses}
					/>
				)}
				{table.getColumn('priority') && (
					<DataTableFacetedFilter
						column={table.getColumn('priority')}
						title="Priority"
						options={priorities}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
