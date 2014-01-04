SSHBox
======

Quick open an SSH session into a compliant VirtualBox instance.

Description
-----------

This software available for Microsoft Windows and GNU/Linux allows to quickly
connect via SSH to a VirtualBox instance using its name.

Usage
-----

The `sshbox` program takes 3 arguments:

1. SSH user (must have the same password).
1. Virtual machine name.
1. Network interface number (0 by default).

For example the `sshbox debian Debian 1` command will try to open a SSH
connexion on a VirtualBox instance named `Debian` with the user `debian`
(having the password `debian`) and using the virtual machine second network
interface to get the right IP for the host-only connection.

Getting Started
---------------

1. If on Microsoft Windows, watch the compilation instructions in the
   `windows` branch.

1. Setup your VirtualBox instances to have a SSH server working, a user
   with the same password as its name, and the host-only adapter properly
   configured (with the VirtualBox Guest Additions installed).

1. Prepare some shortcuts to automate the connexion into your boxes, like
   `sshbox-example`.

1. With the instance working, run your newly created shortcut to quick open
   a SSH connection on the box!

Error Handling
--------------

- Any error with the SSH user, password or host will be delegated to the
  SSH client.

- All other errors will be displayed in a message box (on Microsoft Windows)
  or in the standard error stream (on GNU/Linux), like when the box name
  does not exists, the IP is not accessible, or the PuTTY executable is not
  found.
