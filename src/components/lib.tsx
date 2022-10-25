import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { DevTools } from 'jira-dev-tool';
import React from 'react'
import {Spin} from 'antd'

export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?:number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'rem' : undefined};
> * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem': props.gap ? '2rem' : undefined};
}
`;

// export const Row = styled.div<{
//   gap?: number | boolean;
//   between?: boolean;
//   marginBottom?: number;
// }>`
//   display: flex;
//   align-items: center;
//   justify-content: ${(props) => (props.between ? "space-between" : undefined)};
//   margin-bottom: ${(props) => props.marginBottom + "rem"};

//   > * {
//     margin-top: 0 !important;
//     margin-bottom: 0 !important;
//     margin-right: ${(props) =>
//       typeof props.gap === "number"
//         ? props.gap + "rem"
//         : props.gap
//         ? "2rem"
//         : undefined};
//   }
// `;

const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

export const FullPageLoading = () => <FullPage>
  <Spin size={'large'}></Spin>
</FullPage>

export const FullPageErrorFallback = ({error}:{error: Error | null}) => (<FullPage>
  <DevTools />
  <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
</FullPage>)

export const ButtonNoPadding = styled(Button)`
 padding: 0;
`