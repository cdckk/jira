// import { Table } from 'antd'
// import React from "react";
// import { Dropdown, Menu, Modal, Table } from "antd";
// import dayjs from "dayjs";
// import { TableProps } from "antd/es/table";
// // react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
// import { Link } from "react-router-dom";
// import { Pin } from "components/pin";
// import { useDeleteProject, useEditProject } from "utils/project";
// import { ButtonNoPadding } from "components/lib";
// import {
//   useProjectModal,
//   useProjectsQueryKey,
// } from "screens/project-list/util";
// import { Project } from "types/project";
// import { User } from "types/user";

// interface ListProps extends TableProps<Project> {
//   users: User[];
// }

// export const List = ({ users, ...props }: ListProps) => {
//   const { mutate } = useEditProject(useProjectsQueryKey());
//   const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
//   return (
//     <Table
//       rowKey={"id"}
//       pagination={false}
//       columns={[
//         {
//           title: <Pin checked={true} disabled={true} />,
//           render(value, project) {
//             return (
//               <Pin
//                 checked={project.pin}
//                 onCheckedChange={pinProject(project.id)}
//               />
//             );
//           },
//         },
//         {
//           title: "名称",
//           sorter: (a, b) => a.name.localeCompare(b.name),
//           render(value, project) {
//             return (
//               <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
//             );
//           },
//         },
//         {
//           title: "部门",
//           dataIndex: "organization",
//         },
//         {
//           title: "负责人",
//           render(value, project) {
//             return (
//               <span>
//                 {users.find((user) => user.id === project.personId)?.name ||
//                   "未知"}
//               </span>
//             );
//           },
//         },
//         {
//           title: "创建时间",
//           render(value, project) {
//             return (
//               <span>
//                 {project.created
//                   ? dayjs(project.created).format("YYYY-MM-DD")
//                   : "无"}
//               </span>
//             );
//           },
//         },
//         {
//           render(value, project) {
//             return <More project={project} />;
//           },
//         },
//       ]}
//       {...props}
//     />
//   );
// };

// const More = ({ project }: { project: Project }) => {
//   const { startEdit } = useProjectModal();
//   const editProject = (id: number) => () => startEdit(id);
//   const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
//   const confirmDeleteProject = (id: number) => {
//     Modal.confirm({
//       title: "确定删除这个项目吗?",
//       content: "点击确定删除",
//       okText: "确定",
//       onOk() {
//         deleteProject({ id });
//       },
//     });
//   };
//   return (
//     <Dropdown
//       overlay={
//         <Menu>
//           <Menu.Item onClick={editProject(project.id)} key={"edit"}>
//             编辑
//           </Menu.Item>
//           <Menu.Item
//             onClick={() => confirmDeleteProject(project.id)}
//             key={"delete"}
//           >
//             删除
//           </Menu.Item>
//         </Menu>
//       }
//     >
//       <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
//     </Dropdown>
//   );
// };

import React from 'react'
import { Table, TableProps, Dropdown, Menu, Button } from 'antd'
import { Link } from 'react-router-dom'
import {Pin} from 'components/pin'
import {ButtonNoPadding} from 'components/lib'
import {useEditProject} from 'utils/project'

interface ListType {
  id: string,
  name: string,
  personId: string
}
interface User {
  id: string,
  name: string
}
interface ListProps extends TableProps<any>{
  // list: ListType[],
  users: User[],
  reflesh?: () => void,
  projectButton: JSX.Element
}
export const List = ({users, ...props}: ListProps) => {
  const {mutate} = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.reflesh)
  return <Table
    rowKey={"id"}
    loading
    pagination={false}
    columns={[
      {
        title: <Pin checked={true} disabled={true}></Pin>,
        render(value, project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
        }
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a,b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
        }
      }, 
      {
        title: '负责人',
        render(value, project) {
          return <span>
            {users.find((user) => {
              return user.id === project.personId
            })?.name || '未知'
            }
          </span>
        }
      },
      {
        render(value, project) {
          return <Dropdown overlay={<Menu>
            <Menu.Item key={'edit'}>
              {/* <Button type={'link'} onClick={() => props.setProjectModalOpen(true)}>编辑</Button> */}
              {props.projectButton}
            </Menu.Item>
          </Menu>}>
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
          </Dropdown>
        }
      }
    ]
  }
    // dataSource={list}>
    {...props}>
  </Table>
  // return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>名称</th>
  //           <th>负责人</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           list.map(projects =>
  //             <tr key={projects.id}>
  //               <td>{projects.name}</td>
  //               <td>{users.find((user) => {
  //                 return user.id === projects.personId
  //               })?.name || '未知'
  //               }</td>
  //             </tr>
  //           )
  //         }
  //       </tbody>
  //     </table>
  // )
}
