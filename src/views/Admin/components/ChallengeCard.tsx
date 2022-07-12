import React from 'react'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

import {
  Box,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

export interface Challenge {
  name: string
  id_challenge: string
  expiration_date: Date
  id_test: string
}

export const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  return (
    <Card sx={{ width: '70vw', marginBottom: 2, textAlign: 'left' }}>
      <CardHeader
        action={
          <Box>
            <Button variant="contained" sx={{ marginRight: 2 }}>
              Ajouter une promo
            </Button>
            <Button variant="contained" color="error">
              Fermer la challenge
            </Button>
          </Box>
        }
        title={challenge.name}
      />
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/promo/1/1">
              <ListItemText primary="Promo P2021 Master CTO" />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
