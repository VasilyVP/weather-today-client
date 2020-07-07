import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        status: {
            danger: React.CSSProperties['color']
        }
    }
    interface ThemeOptions {
        status?: {
            danger?: React.CSSProperties['color']
        }
    }
}