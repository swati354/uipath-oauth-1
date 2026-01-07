# UiPath Process Manager

A professional enterprise dashboard application for managing and monitoring UiPath Orchestrator processes. This application provides a comprehensive view of all available automation processes with their key details and statuses, built with React and the UiPath TypeScript SDK.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-oauth-1)

## Features

- **Process Management**: View, monitor, and start UiPath Orchestrator processes
- **Professional Data Table**: Information-dense table displaying process name, key, description, status, and last run information
- **Advanced Filtering**: Search processes by name and filter by folder ID
- **Real-time Updates**: Automatic polling every 30 seconds to ensure current data
- **Status Indicators**: Professional color-coded status badges (green for available, yellow for running, red for failed)
- **Process Actions**: Start processes directly from the dashboard with confirmation dialogs
- **Enterprise Design**: Clean, professional interface optimized for enterprise users
- **Responsive Layout**: Works seamlessly across desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **UiPath Integration**: Official UiPath TypeScript SDK
- **Data Fetching**: TanStack React Query for caching and real-time updates
- **Authentication**: OAuth 2.0 with UiPath Orchestrator
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **Package Manager**: Bun

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- UiPath Orchestrator instance with API access
- OAuth External App configured in UiPath Orchestrator

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uipath-process-manager
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables by creating a `.env` file:
```env
VITE_UIPATH_BASE_URL=https://your-orchestrator-url.com
VITE_UIPATH_ORG_NAME=your-organization-name
VITE_UIPATH_TENANT_NAME=your-tenant-name
VITE_UIPATH_CLIENT_ID=your-oauth-client-id
VITE_UIPATH_REDIRECT_URI=http://localhost:3000
VITE_UIPATH_SCOPE=OR.Execution OR.Folders.Read
```

## OAuth Setup

Before running the application, you need to configure OAuth authentication in UiPath Orchestrator:

1. Navigate to **Admin** > **External Applications** in UiPath Orchestrator
2. Click **Add Application**
3. Configure the application:
   - **Application Type**: Confidential Client
   - **Grant Types**: Authorization Code
   - **Redirect URIs**: Add your application URL (e.g., `http://localhost:3000` for development)
   - **Scopes**: Select appropriate scopes (minimum: `OR.Execution`, `OR.Folders.Read`)
4. Save and copy the **Client ID** to your `.env` file

## Development

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint

## Usage

### Viewing Processes

1. Launch the application and authenticate with your UiPath Orchestrator credentials
2. The main dashboard displays all available processes in a data table
3. Use the search bar to filter processes by name
4. Select a folder from the dropdown to filter processes by folder

### Starting Processes

1. Locate the process you want to start in the table
2. Click the **Start** button in the Actions column
3. Confirm the action in the dialog that appears
4. Monitor the process status updates in real-time

### Process Information

Each process displays:
- **Name**: Process display name
- **Key**: Unique process identifier
- **Description**: Process description from Orchestrator
- **Status**: Current process status with color-coded indicators
- **Actions**: Available operations (Start, View Details)

## Architecture

The application follows a clean architecture pattern:

- **Components**: Reusable UI components built with shadcn/ui
- **Hooks**: Custom React hooks for UiPath SDK integration
- **Services**: UiPath SDK client configuration and authentication
- **Types**: TypeScript definitions for type safety

### Key Components

- `ProcessDashboard`: Main dashboard view with process table
- `ProcessCard`: Individual process display component
- `StatusBadge`: Color-coded status indicators
- `FilterControls`: Search and folder filtering

### Data Flow

1. OAuth authentication with UiPath Orchestrator
2. React Query hooks fetch and cache process data
3. Real-time updates via polling every 30 seconds
4. Client-side filtering for immediate response
5. Mutations for process actions (start, stop)

## Deployment

### Cloudflare Pages

This application is optimized for deployment on Cloudflare Pages:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-oauth-1)

#### Manual Deployment

1. Build the application:
```bash
bun run build
```

2. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy dist
```

#### Environment Variables

Configure the following environment variables in your Cloudflare Pages dashboard:

- `VITE_UIPATH_BASE_URL`
- `VITE_UIPATH_ORG_NAME`
- `VITE_UIPATH_TENANT_NAME`
- `VITE_UIPATH_CLIENT_ID`
- `VITE_UIPATH_REDIRECT_URI` (set to your production URL)
- `VITE_UIPATH_SCOPE`

## Configuration

### Folder Scoping

The application supports folder-based filtering for multi-tenant environments. Configure folder access through the UiPath Orchestrator folder permissions.

### Polling Intervals

Default polling intervals can be customized in the hook configurations:
- Processes: 30 seconds
- Real-time status updates: 10 seconds

### UI Customization

The application uses Tailwind CSS for styling. Customize the theme by modifying:
- `tailwind.config.js` for design tokens
- `src/index.css` for global styles
- Component-level styling in individual files

## Security

- OAuth 2.0 authentication with UiPath Orchestrator
- Secure token storage and refresh
- HTTPS required for production deployments
- Environment variable protection for sensitive data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the [UiPath SDK Documentation](https://docs.uipath.com/)
- Review UiPath Orchestrator API documentation
- Submit issues via GitHub Issues