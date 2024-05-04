'use client'

import { IDKitWidget, ISuccessResult, useIDKit } from '@worldcoin/idkit'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function VerificationDialog({ open, onSuccess, action, signal }: any) {
  
  return (
    <>
    {open && <IDKitWidget
						app_id={process.env.NEXT_PUBLIC_APP_ID as `app_${string}`}
						action={action}
						signal={signal}
						onSuccess={onSuccess}
						autoClose
					/>}
    </>
  );
}

export default VerificationDialog;
