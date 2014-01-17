VirtualBox IP
=============

Execute a program with dynamic VirtualBox IP variable.

Description
-----------

This software will retrieve a VirtualBox instance IP regarding of the given
parameters and will execute a program by passing it the IP.

A config file can be provided to define some paths like the absolute path
to `VBoxManage.exe` (required), and other paths that will be dynamically
replaced in the proxy arguments. Watch examples for more details.

Dependencies
------------

This software is written in [JScript .NET](http://en.wikipedia.org/wiki/JScript_.NET)
and therefore requires the .NET framework to be installed and the Microsoft
JScript .NET compiler available.

A generic compilation command is provided in `build.bat` but you may want to
adapt it with your actual Microsoft .NET version and location.

VirtualBox needs to be installed, and the `VBoxManage.exe` file must
be present.

Options
-------

1. Virtual machine name.
1. Network interface number.
1. Program to execute.

All other arguments will be passed to the program to execute, replacing `{}`
with the current IP.

Also the paths provided in `vboxip.txt` next to the executable file are
dynamically replaced in the parameters.

Example
-------

A default `vboxip.txt` is provided in the `bin` directory, with the variables
I use for my Windows installation, but you will probably have to adapt it.

The following examples are assuming the `vboxip.txt` contains a `firefox` key
with the absolute path to Firefox.

The `sshbox.exe Debian 1 firefox {}` command will replace `firefox` by the
absolute Firefox path and will replace `{}` by the `Debian` instance IP on the
second network interface.

The `sshbox.exe Debian 1 firefox.exe {}/foo` command will not replace
`firefox.exe` (because the argument is not exactly `firefox`), but the `{}/foo`
part will be properly expanded with the instance IP.

Also some example files are provided in the `examples` directory, one to open
the IP in Firefox, and the second to SSH with PuTTY with a given user and
password on the instance.
