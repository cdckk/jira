import React from 'react'
import {Popover, Button, Typography, List, Divider} from 'antd'
import styled from "@emotion/styled";
import {useProjects} from 'utils/project'
import {ButtonNoPadding} from 'components/lib'

export const ProjectPopOver = (props: {projectButton: JSX.Element}) => {
const {data: projects, isLoading} = useProjects()
// console.log('projects', projects);
const pinedProjects = projects?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {
          pinedProjects?.map((project) => {
           return <List.Item key={project.id}>
             <List.Item.Meta title={project.name} />
           </List.Item>
          })
        }
      </List>
      <Divider />
      {/* <ButtonNoPadding
        type={'link'}
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding> */}
      {props.projectButton}
    </ContentContainer>
  )

  return <Popover content={content}>
          {/* <Button type="primary">Hover me</Button> */}
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem;
`