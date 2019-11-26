/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiTitle,
  EuiFlyoutHeader,
  EuiFlyout,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
} from '@elastic/eui';
import { ActionsContext } from '../../context/actions_context';
import { ActionTypeMenu } from './action_type_menu';
import { ActionForm } from './action_form';
import { ActionType } from '../../../types';
import { useAppDependencies } from '../..';

export const ActionAddFlyout = () => {
  const { actionTypeRegistry } = useAppDependencies();
  const { addFlyoutVisible, setAddFlyoutVisibility } = useContext(ActionsContext);
  const [actionType, setActionType] = useState<ActionType | undefined>(undefined);
  const closeFlyout = useCallback(() => setAddFlyoutVisibility(false), [setAddFlyoutVisibility]);

  useEffect(() => {
    setActionType(undefined);
  }, [addFlyoutVisible]);

  if (!addFlyoutVisible) {
    return null;
  }

  let currentForm;
  let actionTypeModel;
  if (!actionType) {
    currentForm = <ActionTypeMenu setActionType={setActionType} />;
  } else {
    actionTypeModel = actionTypeRegistry.get(actionType.id);
    const initialAction = { actionTypeId: actionType.id, config: {}, secrets: {} };

    currentForm = (
      <ActionForm
        actionTypeName={actionType.name}
        initialAction={initialAction}
        setFlyoutVisibility={setAddFlyoutVisibility}
      />
    );
  }

  return (
    <EuiFlyout onClose={closeFlyout} aria-labelledby="flyoutActionAddTitle" size="m">
      <EuiFlyoutHeader hasBorder>
        <EuiFlexGroup gutterSize="s" alignItems="center">
          {actionTypeModel ? (
            <EuiFlexItem grow={false}>
              <EuiIcon type={actionTypeModel.iconClass} size="m" />
            </EuiFlexItem>
          ) : null}
          <EuiFlexItem>
            <EuiTitle size="s">
              <h3 id="flyoutTitle">
                <FormattedMessage
                  defaultMessage={'Create connector'}
                  id="xpack.triggersActionsUI.sections.actionAdd.flyoutTitle"
                />
              </h3>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutHeader>
      {currentForm}
    </EuiFlyout>
  );
};