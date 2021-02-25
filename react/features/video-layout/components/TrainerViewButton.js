// @flow

import type { Dispatch } from 'redux';

import {
    createToolbarEvent,
    sendAnalytics
} from '../../analytics';
import { TRAINER_VIEW_ENABLED, getFeatureFlag } from '../../base/flags';
import { translate } from '../../base/i18n';
import { IconTrainerView } from '../../base/icons';
import { getLocalParticipant, getParticipantCount, isLocalParticipantModerator, pinParticipant } from '../../base/participants';
import { connect } from '../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';
import { setTrainerView, switchTrainerViewBody, setTileView, activateTrainerView } from '../actions';
import { shouldDisplayTrainerView, isTrainerActive } from '../functions';
import { muteAllParticipants } from '../../remote-video-menu/actions';
import logger from '../logger';


/**
 * The type of the React {@code Component} props of {@link TrainerViewButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not trainer view layout has been enabled as the user preference.
     */
    _trainerViewEnabled: boolean,

	/**
	 * a boolean wich indicates if trainerView is active or not. used for the follow me function
	 */
    _trainerViewActive: boolean,

    /**
     * the local Id, wich should be excluded when all get muted
     */

    localParticipantId: string;

    /**
     * Used to dispatch actions from the buttons.
     */
    dispatch: Dispatch<any>
};

/**
 * BinaStar additional Content
 * sports feature trainer view button.
 * > switches to different view and let participants only see moderator.  only visible for moderator
 *
 * Component that renders a toolbar button for toggling the trainer layout view.
 * Developed from tile view button 
 * @extends AbstractButton
 * @author Marcus Zentgraf
 */
class TrainerViewButton<P: Props> extends AbstractButton<P, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.trainerView';
    icon = IconTrainerView;
    label = 'toolbar.enterTrainerView';
    toggledLabel = 'toolbar.exitTrainerView';
    tooltip = 'toolbar.trainerViewToggle';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {

        const { _trainerViewActive, localParticipantId, dispatch } = this.props;

        sendAnalytics(createToolbarEvent(
            'trainerview.button',
            {
                'is_enabled': _trainerViewActive
            }));
        const value = !_trainerViewActive;
        switchTrainerViewBody(value);
        dispatch(muteAllParticipants([localParticipantId]));
        dispatch(setTileView(false));
        dispatch(pinParticipant(localParticipantId));
        dispatch(activateTrainerView(value));
        dispatch(setTrainerView(value));
        dispatch(setTileView(true));

    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._trainerViewEnabled;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code TrainerViewButton} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps) {
    const enabled = getFeatureFlag(state, TRAINER_VIEW_ENABLED, true);
    const lonelyMeeting = getParticipantCount(state) < 2;
    const localParticipant = getLocalParticipant(state);
    const isModerator = isLocalParticipantModerator(state);

    const { visible = enabled && !lonelyMeeting && isModerator } = ownProps;

    return {
        _trainerViewEnabled: shouldDisplayTrainerView(state),
        _trainerViewActive: isTrainerActive(state),
        localParticipantId: localParticipant.id,
        visible
    }
}

export default translate(connect(_mapStateToProps)(TrainerViewButton));
