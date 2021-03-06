import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getMyInvitations } from '../../../state/pets/petsActions'
import { InvitationStatus } from '../../../state/pets/petsReducer'
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core'
import {
  deletePetAccess,
  acceptPetAccess,
  declinePetAccess,
} from '../../../state/invitations/invitationsActions'

export const MyInvitationsPage = () => {
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)

  useEffect(() => {
    dispatch(getMyInvitations())
  }, [])

  return (
    <div className="container">
      {petsState.loading ? (
        <h1>Ładowanie</h1>
      ) : (
        <Fragment>
          {petsState.invitationsStatus.length === 0 ? (
            <Box marginY={2}>
              <Typography variant="h2">Brak zaproszeń / udostępnień</Typography>
            </Box>
          ) : (
            <Fragment>
              <Box marginY={2}>
                <Typography variant="h2">Dostępy</Typography>
              </Box>
              <Grid container spacing={3} justify="space-around">
                {petsState.invitationsStatus.map((status: InvitationStatus) => {
                  return (
                    <Card style={{ minWidth: 300, marginTop: 10 }}>
                      <CardContent>
                        <Typography color="textSecondary">
                          {status.pet.name}
                        </Typography>
                        <Typography>
                          {status.user.firstName} {status.user.lastName} -{' '}
                          {status.user.email}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {status.pending ? (
                          <Fragment>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                dispatch(
                                  acceptPetAccess(status.invitationId as string)
                                )
                                window.location.reload()
                              }}
                            >
                              Zaakceptuj
                            </Button>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                dispatch(
                                  declinePetAccess(
                                    status.invitationId as string
                                  )
                                )
                                window.location.reload()
                              }}
                            >
                              Odrzuć
                            </Button>
                          </Fragment>
                        ) : (
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => {
                              dispatch(
                                deletePetAccess(
                                  status.pet.id as string,
                                  status.user.id as string
                                )
                              )
                              window.location.reload()
                            }}
                          >
                            Usuń dostęp
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  )
                })}
              </Grid>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}
