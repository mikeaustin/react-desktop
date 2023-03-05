import { View, Text, Spacer, Divider, Button, Stack } from 'core';
import { useHotkeys } from 'react-hotkeys-hook';

function Modal({ isOpen, title, header, width, height, children, actions }: any) {
  // useHotkeys('esc', () => setIsAddStoryModalOpen(true));

  return (
    <View align="center" style={{ position: 'fixed', inset: 0, display: isOpen ? '' : 'none' }}>
      <View style={{ position: 'absolute', inset: 0, background: 'hsla(0, 0%, 0%, 0.5)' }} />
      <View fillColor="white" style={{ position: 'relative', width: width ?? 600, height, borderRadius: 4, overflow: 'hidden', boxShadow: '0 0 32px hsla(0, 0%, 0%, 0.5)' }}>
        {(title || header) && (
          <>
            <View padding="medium" fillColor="gray-0">
              {title && (<Text autoFocus fontSize="large">{title}</Text>)}
              {header}
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
