import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Table } from './table'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getInstitutions, getInstitutionsPerVet, signUpInstitution, signOutInstitution } from '../../../state/institutions/institutionsActions'
import { User } from '../../../state/user/userReducer'

interface Props {
  user: User
}

export function TableInstitutions({ user }: Props) {
  const dispatch = useDispatch()
  const institutionsState = useSelector((state: RootState) => state.institutions)

  useEffect(() => {
    dispatch(getInstitutionsPerVet(user.id as string))
    dispatch(getInstitutions())
  }, [])

  return (
    <div>
      <Grid item>
        <Table
          title="Moje Instytucje"
          isLoading={institutionsState.loading}
          columns={[
            {
              title: 'Nazwa',
              field: 'id',
              lookup: institutionsState.items.reduce(
                (a, x) => ({ ...a, [x.id as string]: x.name }),
                {}
              ),
            },
            {
              title: 'Adres', field: 'id',
              lookup: institutionsState.items.reduce(
                (a, x) => ({ ...a, [x.id as string]: x.address }),
                {}
              ),
            }
          ]}

          rows={institutionsState.myItems}
          onDelete={async data => {
            console.log(data)
            dispatch(signOutInstitution(data.id))
            dispatch(getInstitutionsPerVet(user.id as string))
          }}
          onAdd={async data => {
            dispatch(signUpInstitution(data.id))
            dispatch(getInstitutionsPerVet(user.id as string))
          }}
        />
      </Grid>
    </div>
  )
}
