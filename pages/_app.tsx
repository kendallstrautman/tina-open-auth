import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
	useGithubEditing,
	GithubClient,
	TinacmsGithubProvider,
} from 'react-tinacms-github'

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string // e.g: tinacms/tinacms.org

export default class Site extends App {
	cms: TinaCMS

	constructor(props) {
		super(props)
		/*
		 ** 1. Create the TinaCMS instance
		 */
		this.cms = new TinaCMS({
			apis: {
				/*
				 ** 2. Register the GithubClient
				 */
				github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
			},
			/*
			 ** 3. Make sure the Sidebar & Toolbar are
			 **    hidden unless we're in Preview/Edit Mode
			 */
			sidebar: {
				hidden: !props.pageProps.preview,
			},
			toolbar: {
				hidden: !props.pageProps.preview,
			},
		})
	}

	render() {
		const { Component, pageProps } = this.props
		return (
			/*
			 ** 4. Wrap the page Component with the Tina and Github providers
			 */
			<TinaProvider cms={this.cms}>
				<TinacmsGithubProvider
					clientId={process.env.GITHUB_CLIENT_ID}
					authCallbackRoute='/api/create-github-access-token'
					editMode={pageProps.preview}
					enterEditMode={enterEditMode}
					exitEditMode={exitEditMode}
					error={pageProps.error}
				>
					{/*
					 ** 5. Add a button for entering Preview/Edit Mode
					 */}
					<EditLink editMode={pageProps.preview} />
					<Component {...pageProps} />
				</TinacmsGithubProvider>
			</TinaProvider>
		)
	}
}

const enterEditMode = () => {
	return fetch(`/api/preview`).then(() => {
		window.location.href = window.location.pathname
	})
}

const exitEditMode = () => {
	return fetch(`/api/reset-preview`).then(() => {
		window.location.reload()
	})
}

export interface EditLinkProps {
	editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
	const github = useGithubEditing()

	return (
		<button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
			{editMode ? 'Exit Edit Mode' : 'Edit This Site'}
		</button>
	)
}
