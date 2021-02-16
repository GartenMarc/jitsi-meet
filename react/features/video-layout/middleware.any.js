// @flow

import { getCurrentConference } from '../base/conference';
import { PIN_PARTICIPANT, pinParticipant, getPinnedParticipant, isLocalParticipantModerator, getModerator } from '../base/participants';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';
import { SET_DOCUMENT_EDITING_STATUS } from '../etherpad';

import { SET_TILE_VIEW, SET_TRAINER_VIEW, ACTIVATE_TRAINER_VIEW} from './actionTypes';
import { setTileView, setTrainerView } from './actions';

import './subscriber';

let previousTileViewEnabled;
let previousTrainerViewEnabled;

/**
 * Middleware which intercepts actions and updates tile view related state.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const result = next(action);

    switch (action.type) {

    // Actions that temporarily clear the user preferred state of tile view,
    // then re-set it when needed.
    	case PIN_PARTICIPANT: {
        	const pinnedParticipant = getPinnedParticipant(store.getState());
        	if (pinnedParticipant) {
            	_storeTileViewStateAndClear(store);
				_storeTrainerViewStateAndClear(store);
        	} else {
            	_restoreTileViewState(store);
				_restoreTrainerViewState(store);
        	}
        	break;
    	}
    	case SET_DOCUMENT_EDITING_STATUS: {
        	if (action.editing) {
            	_storeTileViewStateAndClear(store);
				_storeTrainerViewStateAndClear(store);
        	} else {
            	_restoreTileViewState(store);
				_restoreTrainerViewState(store);
        	}
        	break;
		}
    // Things to update when tile view state changes
    	case SET_TILE_VIEW: {
        	if (action.enabled && getPinnedParticipant(store)) {
            	store.dispatch(pinParticipant(null));
        	}
			break;
    	}
		case SET_TRAINER_VIEW: {
			if (action.enabled && getPinnedParticipant(store)) {
				store.dispatch(pinParticipant(null));
			}
			break;
		}
		case ACTIVATE_TRAINER_VIEW: {
			if (action.enabled && getPinnedParticipant(store)){
				store.dispatch(pinParticipant(null))
				console.log("middleware.any activate_trainer_view triggered ")
				
			}
		}
	}
    return result;
});

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, { dispatch }, previousConference) => {
        if (conference !== previousConference) {
            // conference changed, left or failed...
            // Clear tile view state.
            dispatch(setTileView(),setTrainerView());
        }
    });

/**
 * Respores tile view state, if it wasn't updated since then.
 *
 * @param {Object} store - The Redux Store.
 * @returns {void}
 */
function _restoreTileViewState({ dispatch, getState }) {
    const { tileViewEnabled } = getState()['features/video-layout'];

    if (tileViewEnabled === undefined && previousTileViewEnabled !== undefined) {
        dispatch(setTileView(previousTileViewEnabled));
    }
    previousTileViewEnabled = undefined;
}

/**
 * Respores trainer view state, if it wasn't updated since then.
 *
 * @param {Object} store - The Redux Store.
 * @returns {void}
 */
function _restoreTrainerViewState({ dispatch, getState }) {
    const { trainerViewEnabled } = getState()['features/video-layout'];

    if (trainerViewEnabled === undefined && previousTrainerViewEnabled !== undefined) {
        dispatch(setTrainerView(previousTrainerViewEnabled));
    }

    previousTrainerViewEnabled = undefined;
}

/**
 * Stores the current tile view state and clears it.
 *
 * @param {Object} store - The Redux Store.
 * @returns {void}
 */
function _storeTileViewStateAndClear({ dispatch, getState }) {
    const { tileViewEnabled } = getState()['features/video-layout'];

    if (tileViewEnabled !== undefined) {
        previousTileViewEnabled = tileViewEnabled;
        dispatch(setTileView(undefined));
    }
}

/**
 * Stores the current trainer view state and clears it.
 *
 * @param {Object} store - The Redux Store.
 * @returns {void}
 */
function _storeTrainerViewStateAndClear({ dispatch, getState }) {
    const { trainerViewEnabled } = getState()['features/video-layout'];

    if (trainerViewEnabled !== undefined) {
        previousTrainerViewEnabled = trainerViewEnabled;
        dispatch(setTrainerView(undefined));
    }
}
