import React from 'react'
import {Drawer} from 'antd'

export const ProjectModal = ({projectModalOpen, onClose}: {projectModalOpen: boolean, onClose: () => void}) => {
  return <Drawer visible={projectModalOpen} onClose={onClose} width={'100%'}>Drawer</Drawer>
}