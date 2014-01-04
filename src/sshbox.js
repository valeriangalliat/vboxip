import System;
import System.IO;
import System.Windows.Forms;

function parseArgs(args) {
  if (args.length < 3) {
    throw 'Not enough arguments.';
  }

  var user = args[1];
  var name = args[2];
  var num = 0;

  if (args.length > 3) {
    num = args[3];

    if (!/^0|1|2|3$/.test(num)) {
      throw 'The interface number must be between 0 and 3 (included).';
    }

    num = +num;
  }

  return {user: user, name: name, num: num};
}

function argsToString(args) {
  for (var i = 0, len = args.length; i < len; i++) {
    args[i] = '"' + args[i].replace('"', '""') + '"';
  }

  return args.join(' ');
}

function invoke(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.CreateNoWindow = true;
  process.StartInfo.UseShellExecute = false;
  process.StartInfo.RedirectStandardOutput = true;
  process.StartInfo.RedirectStandardError = true;
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  process.Start();
  process.WaitForExit();

  if (process.ExitCode !== 0) {
    throw process.StandardError.ReadToEnd();
  }

  return process.StandardOutput.ReadToEnd();;
}

function start(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  process.Start();
}

function trim(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function getBoxIp(name, num) {
  var output = null;

  try {
    output = invoke('\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe', [
      'guestproperty',
      'get',
      name,
      '/VirtualBox/GuestInfo/Net/' + num + '/V4/IP'
    ]);
  } catch (e) {
    if (/VBOX_E_OBJECT_NOT_FOUND/.test(e)) {
      throw 'No box with name \'' + name + '\' was found.';
    }

    throw e;
  }

  var matches = trim(output).match(/^Value: ([0-9\.]+)$/);

  if (matches === null) {
    throw 'Unable to get the IP.';
  }

  return matches[1];
}

function main(args) {
  try {
    var params = parseArgs(args);
    var ip = getBoxIp(params.name, params.num);

    if (!File.Exists('putty.exe')) {
      throw 'Unable to find the PuTTY executable.';
    }

    start('putty.exe', ['-pw', params.user, params.user + '@' + ip]);
  } catch (e) {
    MessageBox.Show(e);
    return 1;
  }
}

System.Environment.Exit(main(System.Environment.GetCommandLineArgs()));
