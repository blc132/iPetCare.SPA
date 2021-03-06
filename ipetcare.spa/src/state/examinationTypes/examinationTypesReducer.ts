import {
  EXAMINATION_TYPES_ACTIONS,
  ExaminationTypesActionTypes,
} from './examinationTypesActions'

export interface ExaminationType {
  id?: number
  name: string
  speciesId: number
}

export interface ExaminationTypesState {
  items: ExaminationType[]
  loading: boolean
  error: String | null
}

const initialState = {
  items: [] as ExaminationType[],
  loading: false,
  error: null,
}

export const examinationTypesReducer = (
  state: ExaminationTypesState = initialState,
  action: EXAMINATION_TYPES_ACTIONS
) => {
  switch (action.type) {
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES:
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPE:
    case ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE:
    case ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE:
    case ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE:
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_BY_PET_ID:
      return { ...state, loading: true }

    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_FAIL:
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_FAIL:
    case ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_FAIL:
    case ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_FAIL:
    case ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_FAIL:
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_BY_PET_ID_FAIL:
      return { ...state, loading: false }

    case ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }

    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_SUCCESS:
    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPES__BY_PET_ID_SUCCESS:

      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    case ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        loading: false,
      }

    case ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_SUCCESS:
    case ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(x => x.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      }

    default:
      return state
  }
}
