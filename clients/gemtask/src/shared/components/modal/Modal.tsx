import { View, Text, Spacer, Divider, Button, Stack } from 'core';
import { useHotkeys } from 'react-hotkeys-hook';

function Modal({ isOpen, title, header, width, height, children, actions }: any) {
  // useHotkeys('esc', () => setIsAddStoryModalOpen(true));

  return (
    <View align="center" padding="medium" style={{ position: 'fixed', inset: 0, display: isOpen ? '' : 'none' }}>
      <View style={{ position: 'absolute', inset: 0, background: 'hsla(0, 0%, 0%, 0.5)' }} />
      <View fillColor="white" style={{ position: 'relative', width: '100%', maxWidth: width ?? 600, height, borderRadius: 4, overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 0 32px hsla(0, 0%, 0%, 0.5)' }}>
        {(title || header) && (
          <>
            <View fillColor="gray-0">
              {title && (
                <View padding="medium">
                  <Text autoFocus fontSize="large">{title}</Text>
                </View>
              )}
              {header && title && (
                <View style={{ marginTop: -16 }} />
              )}
              {header && (
                <View padding="small medium">
                  <Spacer size="small" />
                  {header}
                </View>
              )}
            </View>
            <Divider />
          </>
        )}
        <View flex padding="medium">
          {children}
        </View>
        <Divider />
        <Stack horizontal spacing="small" padding="medium" align="right" fillColor="gray-0">
          {actions}
        </Stack>
      </View>
    </View>
  );
}

export default Modal;
