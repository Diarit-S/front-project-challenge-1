import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'Prenom', headerName: 'Prenom' },
  { field: 'Nom', headerName: 'Nom' },
  {
    field: 'Note',
    headerName: 'Note',
    type: 'number'
  }
]

interface Student {
  Nom: string
  Note: number
  Prenom: string
  challenge: string
  promotion: string
}

const Promo = () => {
  const [promo, setPromo] = useState<Student[]>([])

  const getPromo = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      const response = await fetch('http://51.15.208.76:5050/challenges/score/1/1', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token as string
        }
      })
      const responseData = await response.json()
      setPromo(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPromo()
  }, [])

  return (
    <>
      {Boolean(promo) && (
        <div style={{ height: 400, width: '70vw', color: 'white' }}>
          <DataGrid
            sx={{ color: 'white' }}
            rows={promo.map((student, index) => {
              return { ...student, id: index }
            })}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      )}
      {!promo && <p>Im the promo page</p>}
    </>
  )
}

export default Promo
