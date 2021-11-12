import React from 'react';
import AlertContext from '../../context/alert/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Alerts = () => {
    const alertContext = React.useContext(AlertContext);
    const { alerts } = alertContext;

    return (
        <TransitionGroup>
            {
                alerts.length > 0 && alertContext.alerts.map(alert => (
                    <CSSTransition key={alert.id} timeout={200} classNames="my-node">
                        <div className={`alert alert-${alert.type}`}>
                            <i className="fas fa-info-circle"></i> {alert.msg}
                        </div>
                    </CSSTransition>
                ))
            }

        </TransitionGroup>
    )
}

export default Alerts;