﻿using System.IO;
using FluentAssertions;
using NUnit.Framework;
using PackScript.Core.Host;
using PackScript.Tests.TestInfrastructure;

namespace PackScript.Tests.Integration
{
    [TestFixture]
    public class SyncTests
    {
        private TestFilesApi api;
        private PackContext context;

        [TestFixtureSetUp]
        public void Setup()
        {
            api = new TestFilesApi();
            context = ContextFactory.Create(@"..\..\Integration\Sync", api).ScanForResources().BuildAll();
        }

        [Test]
        public void Simple()
        {
            api.copyFileCalls[0].FirstArg.Should().Be(FullPath(@"Sync\test.js"));
            api.copyFileCalls[0].SecondArg.Should().Be(FullPath("TestOutput/Sync/Simple/test.js"));
        }

        [Test]
        public void Child()
        {
            api.copyFileCalls[1].FirstArg.Should().Be(FullPath(@"Sync\Child\test.js"));
            api.copyFileCalls[1].SecondArg.Should().Be(FullPath("TestOutput/Sync/Child/test.js"));
        }

        [Test]
        public void Recursive()
        {
            api.copyFileCalls[2].FirstArg.Should().Be(FullPath(@"Sync\test.js"));
            api.copyFileCalls[2].SecondArg.Should().Be(FullPath("TestOutput/Sync/Recursive/test.js"));
            api.copyFileCalls[3].FirstArg.Should().Be(FullPath(@"Sync\Child\test.js"));
            api.copyFileCalls[3].SecondArg.Should().Be(FullPath("TestOutput/Sync/Recursive/Child/test.js"));
        }

        [Test]
        public void Alternate()
        {
            api.copyFileCalls[4].FirstArg.Should().Be(FullPath(@"Sync\test.js"));
            api.copyFileCalls[4].SecondArg.Should().Be(FullPath("TestOutput/Sync/Alternate/test.js"));
        }

        private string FullPath(string path)
        {
            return Path.GetFullPath(@"..\..\Integration\") + path;
        }
    }
}
