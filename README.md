SSHBox
======

Quick open an SSH session into a compliant VirtualBox instance.

Description
-----------

This software written for Windows in [JScript .NET](http://en.wikipedia.org/wiki/JScript_.NET)
allows to quickly connect via SSH to a VirtualBox instance using its name.

[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) is required for
the SSH connection and must be in the same directory (or in the `PATH`
environment variable). The simpliest solution is to place a shortcut to your
PuTTY executable into the program directory.

Usage
-----

The `sshbox.exe` program takes 3 arguments:

1. SSH user (must have the same password).
1. Virtual machine name.
1. Network interface number (0 by default).

For example (like in `sshbox-example.bat`), the `sshbox.exe debian Debian 1`
command will try to open a SSH connexion on a VirtualBox instance named `Debian`
with the user `debian` (having the password `debian`) and using the virtual machine
second network interface to get the right IP for the host-only connection.

Getting Started
---------------

1. Compile the executable with Microsoft JScript .NET compiler. A common
   compilation command is provided in `make.bat` but you may will to adapt
   it with your actual Microsoft .NET version and location.

1. Setup your VirtualBox instances to have a SSH server working, a user
   with the same password as its name, and the host-only adapter properly
   configured (with the VirtualBox Guest Additions installed).

1. Prepare some batch scripts to automate the connexion into your boxes, like
   `sshbox-example.bat`.
