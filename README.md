VBoxExec
========

Execute a command with dynamic VirtualBox instance variables.

Description
-----------

This software available for Microsoft Windows and GNU/Linux allows to quickly
execute a system command with dynamic variables provied from a VirtualBox instance.

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
   in the `examples` folder in plateform branches.

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


SSHBox for Microsoft Windows
============================

Please refer to the `master` branch for generic documentation.

Dependencies
------------

This software is written in [JScript .NET](http://en.wikipedia.org/wiki/JScript_.NET)
and therefore requires the .NET framework to be installed and the Microsoft
JScript .NET compiler available.

Obviously VirtualBox needs to be installed, and the `VBoxManage.exe` file must
be present.

[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) is required to
handle the SSH connections.

Configuration
-------------

You can configure the `VBoxManage.exe` and `putty.exe` paths in a `sshbox.txt`
file next to the executable (like the one in `bin` directory). This file is
self-explanatory.

The example file has got the default values (look in current directory or
`PATH`) but you can specify the absolute path to the executables.

If no configuration file is present, the executables are looked in `PATH`.

Compilation
-----------

You can compile the executable with Microsoft JScript .NET compiler.

A generic compilation command is provided in `build.bat` but you may want to
adapt it with your actual Microsoft .NET version and location.
