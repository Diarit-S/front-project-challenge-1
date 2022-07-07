import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  {
    field: 'score',
    headerName: 'Score',
    type: 'number'
  }
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', score: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', score: 42 }
]

const Promo = () => {
  return (
    <div style={{ height: 400, width: '70vw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default Promo
