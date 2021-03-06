import { RACES_ACTIONS } from './races/racesActions'
import { PETS_ACTIONS } from './pets/petsActions'
import { USER_ACTIONS } from './user/userActions'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer, UserState } from './user/userReducer'
import { petsReducer, PetsState } from './pets/petsReducer'
import { racesReducer, RacesState } from './races/racesReducer'
import { searchReducer, SearchState } from './search/searchReducer'

import {
  InstitutionsState,
  institutionsReducer,
} from './institutions/institutionsReducer'
import { INSTITUTIONS_ACTIONS } from './institutions/institutionsActions'
import {
  examinationTypesReducer,
  ExaminationTypesState,
} from './examinationTypes/examinationTypesReducer'
import { EXAMINATION_TYPES_ACTIONS } from './examinationTypes/examinationTypesActions'
import { SpeciesState, speciesReducer } from './species/speciesReducer'
import { SPECIES_ACTIONS } from './species/speciesActions'
import {
  examinationParametersReducer,
  ExaminationParametersState,
} from './examinationParameters/examinationParametersReducer'
import { EXAMINATION_PARAMETERS_ACTIONS } from './examinationParameters/examinationParametersActions'
import { NotesState, notesReducer } from './notes/notesReducer'
import { NOTES_ACTIONS } from './notes/notesActions'
import { IMPORTANT_DATES_ACTIONS } from './importantDates/importantDatesActions'
import {
  ImportantDateState,
  importantDateReducer,
} from './importantDates/importantDatesReducer'
import {
  ExaminationsState,
  examinationsReducer,
} from './examinations/examinationsReducer'
import {
  ExaminationParameterValuesState,
  examinationParameterValuesReducer,
} from './examinationValues/examinationValuesReducer'
import { EXAMINATIONS_ACTIONS } from './examinations/examinationsActions'
import { EXAMINATION_PARAMETER_VALUES_ACTIONS } from './examinationValues/examinationValuesActions'
import { InvitationsState, invitationReducer } from './invitations/invitationsReducer'
import { INVITATIONS_ACTIONS } from './invitations/invitationsActions'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>

export interface RootState {
  readonly user: UserState
  readonly pets: PetsState
  readonly races: RacesState
  readonly search: SearchState
  readonly institutions: InstitutionsState
  readonly examinationTypes: ExaminationTypesState
  readonly examinationParameters: ExaminationParametersState
  readonly species: SpeciesState
  readonly notes: NotesState
  readonly importantDates: ImportantDateState
  readonly examinations: ExaminationsState
  readonly examinationParameterValues: ExaminationParameterValuesState
  readonly invitations: InvitationsState
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
  pets: petsReducer,
  races: racesReducer,
  search: searchReducer,
  institutions: institutionsReducer,
  examinationTypes: examinationTypesReducer,
  examinationParameters: examinationParametersReducer,
  species: speciesReducer,
  notes: notesReducer,
  importantDates: importantDateReducer,
  examinations: examinationsReducer,
  examinationParameterValues: examinationParameterValuesReducer,
  invitations: invitationReducer,
})

export type RootActions =
  | USER_ACTIONS
  | PETS_ACTIONS
  | RACES_ACTIONS
  | INSTITUTIONS_ACTIONS
  | EXAMINATION_TYPES_ACTIONS
  | SPECIES_ACTIONS
  | EXAMINATION_PARAMETERS_ACTIONS
  | NOTES_ACTIONS
  | IMPORTANT_DATES_ACTIONS
  | EXAMINATION_PARAMETER_VALUES_ACTIONS
  | EXAMINATIONS_ACTIONS
  | INVITATIONS_ACTIONS

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
  )
)
