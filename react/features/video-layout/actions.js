// @flow

import type { Dispatch } from 'redux';
import { isLocalParticipantModerator } from '../base/participants';

import {
	SCREEN_SHARE_PARTICIPANTS_UPDATED,
	SET_TILE_VIEW,
	SET_TRAINER_VIEW,
	ACTIVATE_TRAINER_VIEW
} from './actionTypes';
import { shouldDisplayTileView, shouldDisplayTrainerView, isTrainerActive } from './functions';

/**
 * Creates a (redux) action which signals that the list of known participants
 * with screen shares has changed.
 *
 * @param {string} participantIds - The participants which currently have active
 * screen share streams.
 * @returns {{
 *     type: SCREEN_SHARE_PARTICIPANTS_UPDATED,
 *     participantId: string
 * }}
 */
export function setParticipantsWithScreenShare(participantIds: Array<string>) {
	return {
		type: SCREEN_SHARE_PARTICIPANTS_UPDATED,
		participantIds
	};
}

/**
 * Creates a (redux) action which signals to set the UI layout to be tiled view
 * or not.
 *
 * @param {boolean} enabled - Whether or not tile view should be shown.
 * @returns {{
 *     type: SET_TILE_VIEW,
 *     enabled: ?boolean
 * }}
 */
export function setTileView(enabled: ?boolean) {
	console.log("inside setTileView" + enabled)
	return {
		type: SET_TILE_VIEW,
		enabled
	};
}

/**
 * Creates a (redux) action which signals to set the UI layout to be trainer view
 * or not.
 *
 * @param {boolean} enabled - Whether or not trainer view should be shown.
 * @returns {{
 *     type: SET_TRAINER_VIEW,
 *     enabled: ?boolean
 * }}
 */
export function setTrainerView(enabled: ?boolean) {
	return {
		type: SET_TRAINER_VIEW,
		enabled
	};
}

/**
 * Creates a (redux) action which signals to set the UI layout to be trainer view
 * or not.
 *
 * @param {boolean} enabled - Whether or not trainer view should be shown.
 * @returns {{
 *     type: ACTIVATE_TRAINER_VIEW,
 *     enabled: ?boolean
 * }}
 */
export function activateTrainerView(enabled: ?boolean) {
	return {
		type: ACTIVATE_TRAINER_VIEW,
		enabled
	}
}

/** 
* @param {boolean} enabled
*/
export function switchTrainerViewBody(enabled: ?boolean) {
	if (enabled) {	
		document.getElementsByTagName("BODY")[0].className = "moderator";
	} else {
		document.getElementsByTagName("BODY")[0].className = "desktop-browser";
	}
}

/**
 * Creates a (redux) action which signals either to exit tile view if currently
 * enabled or enter tile view if currently disabled.
 *
 * @returns {Function}
 */
export function toggleTileView() {
	console.log("should togle tileView");
	return (dispatch: Dispatch<any>, getState: Function) => {
		const state = getState();
		const tileViewActive = shouldDisplayTileView(state);
		dispatch(setTileView(!tileViewActive, state));
	};
}

/**
* CLEANUP CANDIDAT mainly used toolbox/web/toolbox.js
 * Creates a (redux) action which signals either to exit trainer view if currently
 * enabled or enter trainer view if currently disabled.
 *
 * @returns {Function}
 */
export function toggleTrainerView() {

	return (dispatch: Dispatch<any>, getState: Function) => {
		const state = getState()
		const shouldViewActive = shouldDisplayTrainerView(state);
		
		dispatch(setTrainerView(!shouldViewActive));
	};
}

export function toggleActivateTrainerView() {
	return (dispatch: Dispatch<any>, getState: Function) => {
		const state = getState()
		const isActive = isTrainerActive(state);
		conosle.log("trainerView is akive: " + isActive)
		dispatch(activateTrainerView(!isActive));
	}
}
