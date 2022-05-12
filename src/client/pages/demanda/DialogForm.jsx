import React from 'react';
import Form from '~/components/form/Form';
import Dialog from '~/components/Dialog';

const Component = ({ children, formId, isValid, action, onChangeDialog, exibeDialog }) => {

    return (
        <Dialog open={exibeDialog[formId]} onClose={() => onChangeDialog(formId)}>
            <Form
                width={800}
                id={`form-${formId}`}
                action={action}
                actions={[
                    {
                        type: 'submit',
                        label: 'Salvar',
                        startIcon: 'save',
                        disabled: !isValid,
                    },
                    {
                        label: 'Cancelar',
                        onClick: () => onChangeDialog(formId),
                        startIcon: 'cancel',
                    },
                ]}
            >
                {children}
            </Form>
        </Dialog>
    )
};

Component.defaultProps = {
    isValid: true,
}

export default Component;
