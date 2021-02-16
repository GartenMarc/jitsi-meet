// @flow

import { ReducerRegistry } from '../base/redux';

import {
    SCREEN_SHARE_PARTICIPANTS_UPDATED,
    SET_TILE_VIEW,
	SET_TRAINER_VIEW,
	ACTIVATE_TRAINER_VIEW
} from './actionTypes';

const DEFAULT_STATE = {
    screenShares: [],

    /**
     * The indicator which determines whether the video layout should display
     * video thumbnails in a tiled layout.
     *
     * Note: undefined means that the user hasn't requested anything in particular yet, so
     * we use our auto switching rules.
     *
     * @public
     * @type {boolean}
     */
    tileViewEnabled: undefined,
    /**
     * @public
     * @type {boolean}
     */
	trainerViewEnabled: undefined,
	 /**
     * @public
     * @type {boolean}
     */
	trainerViewActive: undefined
	

};

const STORE_NAME = 'features/video-layout';

ReducerRegistry.register(STORE_NAME, (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    	case SCREEN_SHARE_PARTICIPANTS_UPDATED: {
        	return {
            	...state,
            	screenShares: action.participantIds
        	};
    	}

    	case SET_TILE_VIEW: {
        	return {
          		...state,
            	tileViewEnabled: action.enabled
        	};
    	}
		case SET_TRAINER_VIEW: {
			return {
				...state,
				trainerViewEnabled: action.enabled
			}
		}
		case ACTIVATE_TRAINER_VIEW:{
			return {
				...state,
				trainerViewActive: action.enabled
			}
		}
	}
    return state;
});
