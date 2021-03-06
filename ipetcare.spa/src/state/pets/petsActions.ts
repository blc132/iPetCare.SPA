import { history } from './../../index'
import { Pets as pets } from '../../api'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Pet, PetForm, PetDetails, InvitationStatus } from './petsReducer'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export enum PetsActionTypes {
  GET_PETS = 'GET_PETS',
  GET_PETS_SUCCESS = 'GET_PETS_SUCCESS',
  GET_PETS_FAIL = 'GET_PETS_FAIL',
  GET_MY_PETS = 'GET_MY_PETS',
  GET_MY_PETS_SUCCESS = 'GET_MY_PETS_SUCCESS',
  GET_MY_PETS_FAIL = 'GET_MY_PETS_FAIL',
  GET_SHARED_PETS = 'GET_SHARED_PETS',
  GET_SHARED_PETS_SUCCESS = 'GET_SHARED_PETS_SUCCESS',
  GET_SHARED_PETS_FAIL = 'GET_SHARED_PETS_FAIL',
  GET_PET = 'GET_PET',
  GET_PET_SUCCESS = 'GET_PET_SUCCESS',
  GET_PET_FAIL = 'GET_PET_FAIL',
  CREATE_PET = 'CREATE_PET',
  CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS',
  CREATE_PET_FAIL = 'CREATE_PET_FAIL',
  UPDATE_PET = 'UPDATE_PET',
  UPDATE_PET_SUCCESS = 'UPDATE_PET_SUCCESS',
  UPDATE_PET_FAIL = 'UPDATE_PET_FAIL',
  DELETE_PET = 'DELETE_PET',
  DELETE_PET_SUCCESS = 'DELETE_PET_SUCCESS',
  DELETE_PET_FAIL = 'DELETE_PET_FAIL',
  GET_USER_PETS = 'GET_USER_PETS',
  GET_USER_PETS_FAIL = 'GET_USER_PETS_FAIL',
  GET_USER_PETS_SUCCESS = 'GET_USER_PETS_SUCCESS',
  GET_PET_INVITATIONS = 'GET_PET_INVITATIONS',
  GET_PET_INVITATIONS_FAIL = 'GET_PET_INVITATIONS_FAIL',
  GET_PET_INVITATIONS_SUCCESS = 'GET_PET_INVITATIONS_SUCCESS',
  GET_MY_INVITATIONS = 'GET_MY_INVITATIONS',
  GET_MY_INVITATIONS_FAIL = 'GET_MY_INVITATIONS_FAIL',
  GET_MY_INVITATIONS_SUCCESS = 'GET_MY_INVITATIONS_SUCCESS'
}

// FETCH PET LIST
interface GetPets {
  type: PetsActionTypes.GET_PETS
}

interface GetPetsSuccess {
  type: PetsActionTypes.GET_PETS_SUCCESS
  payload: any
}

interface GetPetsFail {
  type: PetsActionTypes.GET_PETS_FAIL
}

export const getPets = (): ThunkResult<void> => async dispatch => {
  handleGetPets(dispatch)
  try {
    const response: Pet[] = await pets.getPets()
    handleGetPetsSuccess(dispatch, response)
  } catch (e) {
    handleGetPetsFail(dispatch)
  }
}

export const handleGetPets = (dispatch: Dispatch<GetPets>) => {
  dispatch({ type: PetsActionTypes.GET_PETS })
}

export const handleGetPetsSuccess = (
  dispatch: Dispatch<GetPetsSuccess>,
  response: Pet[]
) => {
  dispatch({
    type: PetsActionTypes.GET_PETS_SUCCESS,
    payload: response,
  })
}

export const handleGetPetsFail = (dispatch: Dispatch<GetPetsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_PETS_FAIL,
  })
}

// FETCH MY PETS LIST
interface GetMyPets {
  type: PetsActionTypes.GET_MY_PETS
}

interface GetMyPetsSuccess {
  type: PetsActionTypes.GET_MY_PETS_SUCCESS
  payload: Pet[]
}

interface GetMyPetsFail {
  type: PetsActionTypes.GET_MY_PETS_FAIL
}

export const getMyPets = (): ThunkResult<void> => async dispatch => {
  handleGetMyPets(dispatch)
  try {
    const response: Pet[] = await pets.getMyPets()
    handleGetMyPetsSuccess(dispatch, response)
  } catch (e) {
    handleGetMyPetsFail(dispatch)
  }
}

export const handleGetMyPets = (dispatch: Dispatch<GetMyPets>) => {
  dispatch({ type: PetsActionTypes.GET_MY_PETS })
}

export const handleGetMyPetsSuccess = (
  dispatch: Dispatch<GetMyPetsSuccess>,
  response: Pet[]
) => {
  dispatch({
    type: PetsActionTypes.GET_MY_PETS_SUCCESS,
    payload: response,
  })
}

export const handleGetMyPetsFail = (dispatch: Dispatch<GetMyPetsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_MY_PETS_FAIL,
  })
}

// FETCH SHARED PETS LIST
interface GetSharedPets {
  type: PetsActionTypes.GET_SHARED_PETS
}

interface GetSharedPetsSuccess {
  type: PetsActionTypes.GET_SHARED_PETS_SUCCESS
  payload: Pet[]
}

interface GetSharedPetsFail {
  type: PetsActionTypes.GET_SHARED_PETS_FAIL
}

export const getSharedPets = (): ThunkResult<void> => async dispatch => {
  handleGetSharedPets(dispatch)
  try {
    const response: Pet[] = await pets.getSharedPets()
    handleGetSharedPetsSuccess(dispatch, response)
  } catch (e) {
    handleGetSharedPetsFail(dispatch)
  }
}

export const handleGetSharedPets = (dispatch: Dispatch<GetSharedPets>) => {
  dispatch({ type: PetsActionTypes.GET_SHARED_PETS })
}

export const handleGetSharedPetsSuccess = (
  dispatch: Dispatch<GetSharedPetsSuccess>,
  response: Pet[]
) => {
  dispatch({
    type: PetsActionTypes.GET_SHARED_PETS_SUCCESS,
    payload: response,
  })
}

export const handleGetSharedPetsFail = (dispatch: Dispatch<GetSharedPetsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_SHARED_PETS_FAIL,
  })
}

// FETCH SINGLE PET
interface GetPet {
  type: PetsActionTypes.GET_PET
}

interface GetPetSuccess {
  type: PetsActionTypes.GET_PET_SUCCESS
  payload: Pet
}

interface GetPetFail {
  type: PetsActionTypes.GET_PET_FAIL
}

export const getPet = (id: string): ThunkResult<void> => async dispatch => {
  handleGetPet(dispatch)
  try {
    const response: Pet = await pets.getPet(id)
    handleGetPetSuccess(dispatch, response)
  } catch (e) {
    handleGetPetFail(dispatch)
  }
}

export const handleGetPet = (dispatch: Dispatch<GetPet>) => {
  dispatch({ type: PetsActionTypes.GET_PET })
}

const handleGetPetSuccess = (
  dispatch: Dispatch<GetPetSuccess>,
  response: Pet
) => {
  dispatch({
    type: PetsActionTypes.GET_PET_SUCCESS,
    payload: response,
  })
}

const handleGetPetFail = (dispatch: Dispatch<GetPetFail>) => {
  dispatch({
    type: PetsActionTypes.GET_PET_FAIL,
  })
}

// ADD PET
interface CreatePet {
  type: PetsActionTypes.CREATE_PET
}

interface CreatePetSuccess {
  type: PetsActionTypes.CREATE_PET_SUCCESS
  payload: Pet
}

interface CreatePetFail {
  type: PetsActionTypes.CREATE_PET_FAIL
}

export const createPet = (
  pet: PetForm
): ThunkResult<void> => async dispatch => {
  handleCreatePet(dispatch)
  try {
    console.log(pet)
    const response: Pet = await pets.create(pet)
    console.log(response)
    handleCreatePetSuccess(dispatch, response)
    toast.success('Pomyslnie utworzono zwierzę')
  } catch (e) {
    handleCreatePetFail(dispatch)
  }
}

const handleCreatePet = (dispatch: Dispatch<CreatePet>) => {
  dispatch({ type: PetsActionTypes.CREATE_PET })
}

const handleCreatePetSuccess = (
  dispatch: Dispatch<CreatePetSuccess>,
  response: Pet
) => {
  dispatch({ type: PetsActionTypes.CREATE_PET_SUCCESS, payload: response })
}

const handleCreatePetFail = (dispatch: Dispatch<CreatePetFail>) => {
  dispatch({ type: PetsActionTypes.CREATE_PET_FAIL })
}

// EDIT PET
interface UpdatePet {
  type: PetsActionTypes.UPDATE_PET
}

interface UpdatePetSuccess {
  type: PetsActionTypes.UPDATE_PET_SUCCESS
  payload: Pet
}

interface UpdatePetFail {
  type: PetsActionTypes.UPDATE_PET_FAIL
}

export const updatePet = (
  updatedPet: PetForm
): ThunkResult<void> => async dispatch => {
  handleUpdatePet(dispatch)
  try {
    const response: AxiosResponse<Pet> = await pets.update(updatedPet)
    handleUpdatePetSuccess(dispatch, response.data)
    toast.success('Pomyślnie zaktualizowano dane zwierzęcia')
  } catch (e) {
    handleUpdatePetFail(dispatch)
  }
}

const handleUpdatePet = (dispatch: Dispatch<UpdatePet>): void => {
  dispatch({ type: PetsActionTypes.UPDATE_PET })
}

const handleUpdatePetSuccess = (
  dispatch: Dispatch<UpdatePetSuccess>,
  updatedPet: Pet
) => {
  dispatch({ type: PetsActionTypes.UPDATE_PET_SUCCESS, payload: updatedPet })
}

const handleUpdatePetFail = (dispatch: Dispatch<UpdatePetFail>) => {
  dispatch({ type: PetsActionTypes.UPDATE_PET_FAIL })
}

// DELETE PET
interface DeletePet {
  type: PetsActionTypes.DELETE_PET
}

interface DeletePetSuccess {
  type: PetsActionTypes.DELETE_PET_SUCCESS
  payload: string
}

interface DeletePetFail {
  type: PetsActionTypes.DELETE_PET_FAIL
}

export const deletePet = (
  deletedId: string
): ThunkResult<void> => async dispatch => {
  dispatch({ type: PetsActionTypes.DELETE_PET })
  try {
    await pets.delete(deletedId)
    dispatch({
      type: PetsActionTypes.DELETE_PET_SUCCESS,
      payload: deletedId,
    })
    history.push('/pets')
    toast.success('Pomyślnie usunięto zwierzę')
  } catch (e) {
    dispatch({ type: PetsActionTypes.DELETE_PET_FAIL })
  }
}


// get user pets
interface GetUserPets {
  type: PetsActionTypes.GET_USER_PETS
}

interface GetUserPetsSuccess {
  type: PetsActionTypes.GET_USER_PETS_SUCCESS
  payload: PetDetails[]
}

interface GetUserPetsFail {
  type: PetsActionTypes.GET_USER_PETS_FAIL
}


export const getUserPets = (userId: string): ThunkResult<void> => async dispatch => {
  dispatch({ type: PetsActionTypes.GET_USER_PETS })
  try {
    const userPets: PetDetails[] = await pets.getUserPets(userId);
    dispatch({
      type: PetsActionTypes.GET_USER_PETS_SUCCESS,
      payload: userPets
    })
  } catch (e) {
    dispatch({ type: PetsActionTypes.GET_USER_PETS_FAIL })
  }
}


// FETCH PET INVITATIONS
interface GetPetInvitations {
  type: PetsActionTypes.GET_PET_INVITATIONS
}

interface GetPetInvitationsSuccess {
  type: PetsActionTypes.GET_PET_INVITATIONS_SUCCESS
  payload: InvitationStatus[]
}

interface GetPetInvitationsFail {
  type: PetsActionTypes.GET_PET_INVITATIONS_FAIL
}

export const getPetInvitations = (id: string): ThunkResult<void> => async dispatch => {
  handleGetPetInvitations(dispatch)
  try {
    const response: InvitationStatus[] = await pets.getInvitationsStatus(id)
    handleGetPetInvitationsSuccess(dispatch, response)
  } catch (e) {
    handleGetPetInvitationsFail(dispatch)
  }
}

export const handleGetPetInvitations = (dispatch: Dispatch<GetPetInvitations>) => {
  dispatch({ type: PetsActionTypes.GET_PET_INVITATIONS })
}

const handleGetPetInvitationsSuccess = (
  dispatch: Dispatch<GetPetInvitationsSuccess>,
  response: InvitationStatus[]
) => {
  dispatch({
    type: PetsActionTypes.GET_PET_INVITATIONS_SUCCESS,
    payload: response,
  })
}

const handleGetPetInvitationsFail = (dispatch: Dispatch<GetPetInvitationsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_PET_INVITATIONS_FAIL,
  })
}

//FETCH ALL USER INVITATIONS
interface GetMyInvitations {
  type: PetsActionTypes.GET_MY_INVITATIONS
}

interface GetMyInvitationsSuccess {
  type: PetsActionTypes.GET_MY_INVITATIONS_SUCCESS
  payload: InvitationStatus[]
}

interface GetMyInvitationsFail {
  type: PetsActionTypes.GET_MY_INVITATIONS_FAIL
}

export const getMyInvitations = (): ThunkResult<void> => async dispatch => {
  handleGetMyInvitations(dispatch)
  try {
    const response: InvitationStatus[] = await pets.getMyInvitations()
    handleGetMyInvitationsSuccess(dispatch, response)
  } catch (e) {
    handleGetMyInvitationsFail(dispatch)
  }
}

export const handleGetMyInvitations = (dispatch: Dispatch<GetMyInvitations>) => {
  dispatch({ type: PetsActionTypes.GET_MY_INVITATIONS })
}

const handleGetMyInvitationsSuccess = (
  dispatch: Dispatch<GetMyInvitationsSuccess>,
  response: InvitationStatus[]
) => {
  dispatch({
    type: PetsActionTypes.GET_MY_INVITATIONS_SUCCESS,
    payload: response,
  })
}

const handleGetMyInvitationsFail = (dispatch: Dispatch<GetMyInvitationsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_MY_INVITATIONS_FAIL,
  })
}


export type PETS_ACTIONS =
  | GetPets
  | GetPetsSuccess
  | GetPetsFail
  | GetMyPets
  | GetMyPetsSuccess
  | GetMyPetsFail
  | GetSharedPets
  | GetSharedPetsSuccess
  | GetSharedPetsFail
  | GetUserPets
  | GetUserPetsFail
  | GetUserPetsSuccess
  | GetPet
  | GetPetSuccess
  | GetPetFail
  | CreatePet
  | CreatePetSuccess
  | CreatePetFail
  | UpdatePet
  | UpdatePetSuccess
  | UpdatePetFail
  | DeletePet
  | DeletePetSuccess
  | DeletePetFail
  | GetPetInvitations
  | GetPetInvitationsFail
  | GetPetInvitationsSuccess
  | GetMyInvitations
  | GetMyInvitationsFail
  | GetMyInvitationsSuccess
